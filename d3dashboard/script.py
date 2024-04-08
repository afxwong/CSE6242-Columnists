import json
import sys
import pandas as pd
import random
import string
import numpy as np

def main():
    # sys.stdout.reconfigure(buffering=0)
    # Define some data
    # data = {
    #     "message": "Hello from Python!",
    #     "values": [1, 2, 3, 4, 5],
    #     "arg": sys.argv[1]
    # }
    
    # # Convert data to JSON format
    # json_data = json.dumps(data)
    
    url = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
    data = pd.read_csv(url)

    def random_string(length=5):
        return ''.join(random.choice(string.ascii_letters) for _ in range(length))
    
    data['score'] = np.random.rand(data.shape[0])
    data['caption'] = [random_string() for _ in range(data.shape[0])]
    # Print JSON data

    json_data = data.to_json(orient='records')
    print(json_data)

if __name__ == "__main__":
    main()