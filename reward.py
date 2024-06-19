def reward_function(params):
    track_width=params['track_width']
    distance_from_center=params['distance_from_center']
    all_wheels_on_track=params['all_wheels_on_track']
    speed=params['speed']
    steering_angle=params['steering_angle']

    marker_1 = 0.1 * track_width
    marker_2 = 0.25 * track_width
    marker_3 = 0.5 * track_width

    if not all_wheels_on_track:
        reward = 1e-3
        return float(reward)
    
    if distance_from_center <= marker_1:
        reward = 1.0
    elif distance_from_center <= marker_2:
        reward = 0.5
    elif distance_from_center <= marker_3:
        reward = 0.1
    
    
    # max speed =4
    # -5 to 5 angle: speed should be greater than 3
    # -10 to 10 angle: speed should be greater than 2
    # -15 to 15 angle: speed should be greater than 1
    # more than 15 angle: speed should be less than 1
    if -5<steering_angle<5:
        if speed>3:
            reward+=1
        elif speed>2.5:
            reward+=0.5
    elif -10<steering_angle<10:
        if speed>2:
            reward+=1
        elif speed>1.5:
            reward+=0.5
    elif -15<steering_angle<15:
        if speed>1:
            reward+=1
        elif speed>0.5:
            reward+=0.5
    elif steering_angle>15 or steering_angle<-15:
        if speed<1:
            reward+=1
        else :
            reward*=0.5
    
    return float(reward)
