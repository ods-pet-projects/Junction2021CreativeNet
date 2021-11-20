import numpy as np
import os
import pandas as pd
from catboost import CatBoostClassifier


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


def main():
    test = pd.read_csv(f'{kone_dir}/test.csv')
    test = add_features(test)

    cat_cols = ['case_id', 'equipment_id', 'action_recommendation_id', 'action_recommendation_type',
                'action_recommendation_category', 'equipment_area', 'usage_type', 'equipment_category']

    model = CatBoostClassifier(cat_features=cat_cols, iterations=600)
    model.load_model(f'{kone_dir}/catboost_model')
    test = prepare_X(test)
    y_pred = model.predict_proba(test)[:, 1]
    test['probability'] = y_pred
    test = add_sensor_quality(test)
    test.to_csv(f'{kone_dir}/test_predicted_add.csv', index=False)


if __name__ == '__main__':
    main()
