import numpy as np
import scipy
import pandas as pd
import os
from tqdm import tqdm
from transformers import CLIPProcessor, CLIPModel
from transformers import logging
logging.set_verbosity_error()


if __name__ == "__main__":

    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
    model.save_pretrained("./d3dashboard/models/clip")
    processor.save_pretrained("./d3dashboard/models/processor")