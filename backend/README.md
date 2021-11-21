## Backend
Python flask API with GET/POST route `http://host:port/api/get_queries`

Returns list of current equipment queries as json rows
- id - equipment id
- probability - predicted probability of positive feedback by ML model
- action_type - type of reqiured action, means how fast we should solve problem
- area_id - location area id
- sensor_quality - estimation of sensor quality using statistic `pos feedback / all feedback count`
- shap_vals_plot - calculated SHAP values per each prediction, which shows why model decides in that way
- shap_inter_str - generated explanation of SHAP values by our algorithms
- speed - speed category of equipment

