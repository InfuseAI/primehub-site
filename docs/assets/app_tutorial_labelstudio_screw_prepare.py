import json
import shutil
import os
import argparse
from pathlib import Path

parser = argparse.ArgumentParser(description='Prepare screw train/val data.')
parser.add_argument('--path', type=str, help='path to your labeled data, e.g., /project/<group_name>/screw-labeled', required=True)

args = parser.parse_args()

dir_path = args.path
data_path = './data'
data_train_good_path = os.path.join(data_path, 'train', 'good')
data_train_bad_path = os.path.join(data_path, 'train', 'bad')
data_val_good_path = os.path.join(data_path, 'val', 'good')
data_val_bad_path = os.path.join(data_path, 'val', 'bad')

p = Path(dir_path).glob('**/*')
files = [x for x in p if x.is_file()]

shutil.rmtree(data_path, ignore_errors=True)
os.makedirs(data_train_good_path, exist_ok=True)
os.makedirs(data_train_bad_path, exist_ok=True)
os.makedirs(data_val_good_path, exist_ok=True)
os.makedirs(data_val_bad_path, exist_ok=True)

val_count = 4
val_good_count = 0
val_bad_count = 0

for file in files:
    f = open(file)
    data = json.load(f)
    file_path = '/' + data['task']['data']['image'].split('?d=')[-1]
    file_name = file_path.split('/')[-1]
    result = data['result'][0]['value']['choices'][0]
    if result == 'good':
        if val_good_count < val_count:
            shutil.copyfile(file_path, os.path.join(data_val_good_path, file_name))
            val_good_count = val_good_count + 1
        else:
            shutil.copyfile(file_path, os.path.join(data_train_good_path, file_name))
    else:
        if val_bad_count < val_count:
            shutil.copyfile(file_path, os.path.join(data_val_bad_path, file_name))
            val_bad_count = val_bad_count + 1
        else:
            shutil.copyfile(file_path, os.path.join(data_train_bad_path, file_name))
    f.close()
    
print('done')