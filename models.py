import numpy as np
import os
import pandas as pd
from catboost import CatBoostClassifier
import shap


if os.path.exists('/home/junc/mlcup/kone'):
    kone_dir = '/home/junc/mlcup/kone'
else:
    kone_dir = '/Users/o/PycharmProjects/Junction2021CreativeNet/kone_dir'


def add_features(train):
    train['completion_date'] = pd.to_datetime(train['completion_date'])
    train['dayofweek'] = train['completion_date'].map(lambda x: x.dayofweek)
    train['dayofmonth'] = train['completion_date'].map(lambda x: x.day)
    train['dayofyear'] = train['completion_date'].map(lambda x: x.dayofyear)

    weekly_N = 3
    weekly_P = 7
    for n in range(1, weekly_N + 1):
        col_name = 'weekly_' + str(n)
        train[col_name + '_sin'] = np.sin((2 * np.pi * n * train['dayofweek']) / weekly_P)
        train[col_name + '_cos'] = np.cos((2 * np.pi * n * train['dayofweek']) / weekly_P)

    monthly_N = 5
    monthly_P = 30.5
    for n in range(1, monthly_N + 1):
        col_name = 'monthly_' + str(n)
        train[col_name + '_sin'] = np.sin((2 * np.pi * n * train['dayofmonth']) / monthly_P)
        train[col_name + '_cos'] = np.cos((2 * np.pi * n * train['dayofmonth']) / monthly_P)

    yearly_N = 10
    yearly_P = 365.25
    for n in range(1, yearly_N + 1):
        col_name = 'yearly_' + str(n)
        train[col_name + '_sin'] = np.sin((2 * np.pi * n * train['dayofyear']) / yearly_P)
        train[col_name + '_cos'] = np.cos((2 * np.pi * n * train['dayofyear']) / yearly_P)

    train['speed_load'] = train['speed_category'] * train['load_category']
    train['speed_floor'] = train['speed_category'] * train['floors_category']
    train['load_floor'] = train['load_category'] * train['floors_category']

    return train


def prepare_X(test):
    test = test.drop(['completion_date'], axis=1)
    mode = test['action_recommendation_id'].mode().values[0]
    test['action_recommendation_id'] = test['action_recommendation_id'].fillna(mode)
    mode = test['equipment_area'].mode().values[0]
    test['equipment_area'] = test['equipment_area'].fillna(mode)
    return test


def add_sensor_quality(test):
    sensors_quality = pd.read_csv(f'{kone_dir}/sensors_quality.csv')
    test = pd.merge(test, sensors_quality, on='equipment_id', how='left')
    return test


def get_last_model():
    cat_cols = ['case_id', 'equipment_id', 'action_recommendation_id', 'action_recommendation_type',
                'action_recommendation_category', 'equipment_area', 'usage_type', 'equipment_category']

    model = CatBoostClassifier(cat_features=cat_cols, iterations=600)
    model.load_model(f'{kone_dir}/catboost_model')
    return model


def save_test_predict_df():
    test = pd.read_csv(f'{kone_dir}/test.csv')
    test = add_features(test)

    test = prepare_X(test)

    model = get_last_model()
    y_pred = model.predict_proba(test)[:, 1]
    test['probability'] = y_pred
    test = add_sensor_quality(test)
    test.to_csv(f'{kone_dir}/test_predicted_add.csv', index=False)


def shap_inter(shap_row):
    interpret = []
    str_equip_area = "Feature equipment_area defined the geographically close equipments shows that the visit is "
    str_recom_action_id = "Unique identifier of the service action recommendation action_recomendation_id shows that the visit is "
    str_usage_type = "Feature related to equipment belonging to the same usage_type shows that the visit is "

    if shap_row.iloc[5].value >= 0:
        interpret.append(str_equip_area + "necessary.")
    else:
        interpret.append(str_equip_area + "unnecessary.")

    if shap_row.iloc[6].value >= 0:
        interpret.append(str_usage_type + "necessary.")
    else:
        interpret.append(str_usage_type + "unnecessary.")

    if shap_row.iloc[2].value >= 0:
        interpret.append(str_recom_action_id + "necessary.")
    else:
        interpret.append(str_recom_action_id + "unnecessary.")
    return "\n ".join(interpret)


def add_shap_info(train):
    model = get_last_model()
    explainer = shap.Explainer(model)
    shap_values = explainer(train[model.feature_names_].fillna(''))

    shap_vals_plot_list = []
    shap_inter_str_list = []

    for i in range(len(shap_values)):
        shap_row = shap_values[i]
        shap_row_df = pd.DataFrame({'value': shap_row.values,
                                   'data': shap_row.data,
                                   'shap_value': [shap_row.base_values] * len(shap_values[1].values),
                                   'cols': model.feature_names_
                                   })
        shap_row_df['values_abs'] = shap_row_df['value'].abs()
        shap_vals_plot = shap_row_df.sort_values('values_abs', ascending=False).head(3)
        # shap_vals_plot.index = shap_vals_plot['cols']
        shap_vals_plot['color'] = np.where(shap_vals_plot['value'] < 0, 'blue', 'red')
        shap_vals_plot_list.append(shap_vals_plot.to_json())
        # shap_vals_plot['value'].plot(kind='bar', xlabel='cols', color=shap_vals_plot['color'].values)
        shap_inter_str = shap_inter(shap_row_df)
        shap_inter_str_list.append(shap_inter_str)

    train['shap_vals_plot'] = shap_vals_plot_list
    train['shap_inter_str'] = shap_inter_str_list

    # visualize the first prediction's explanation
    # shap.plots.waterfall(shap_values[0])
    return train


def save_train_predict_df():
    train = pd.read_csv(f'{kone_dir}/train.csv')
    train = add_features(train)

    cat_cols = ['case_id', 'equipment_id', 'action_recommendation_id', 'action_recommendation_type',
                'action_recommendation_category', 'equipment_area', 'usage_type', 'equipment_category']

    model = CatBoostClassifier(cat_features=cat_cols, iterations=600)
    model.load_model(f'{kone_dir}/catboost_model')
    train = prepare_X(train)
    y_pred = model.predict_proba(train)[:, 1]
    train['probability'] = y_pred
    train = add_sensor_quality(train)
    train = train.head(300)
    train = add_shap_info(train)
    train.to_csv(f'{kone_dir}/train_predicted_add_300.csv', index=False)


def main():
    # save_test_predict_df()
    save_train_predict_df()


if __name__ == '__main__':
    main()
