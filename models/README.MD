## The solution pipeline
+ explorational data analysis;
+ categorical variables encoding with different technics such as:
+ Binary encoding;
+ Label encoding;
+ One-Hot encoding;
+ CatBoost encoding.
+ feature extraction from datetime data: we approximate seasonal effects with a standard Fourier series with different orders;
+ calculation additional features from combination of numerical variables such as 'speed_category', 'load_category', 'floors_category';
use different machine learning algorithms:
+ Logistic Regression;
+ Neural Networks;
+ LightGBM classifier;
+ CatBoost classifier.
+ We check it by validation data and cross-validation technic, tuning hyperparameters with nonregular grid. The best quality was F2=0.98.
+ We have chosen Catboost as the most performance model. Applied feature selection shows that all generated features were important. Therefore, we kept all of them.
+ Further, using the best model we’ve obtained probabilities of positive feedback and estimated model’s quality on crossvalidation by ROC AUC metric (0.91).
## Data insights
+ action_recommendation_type == art03 occurs mostly in buildings with passengers lifts with low loading and low speed category. We concluded that these buildings are civil houses. While art02 is for most loaded buildings, we suppose there are skyscrapers.
