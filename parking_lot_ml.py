from roboflow import Roboflow
import csv

# this func use the model to calculate the percentage of space-empty in a parking lot
def predict_percentage(model, img):
    a = model.predict(img, confidence=40, overlap=30).json()
    perc = 0
    for i in a['predictions']:
        if i['class'] == 'space-empty':
            perc += 1
    return perc, len(a['predictions']) - perc, perc / len(a['predictions'])

with open('private_api_key.txt', 'r') as file:
    # Read a single line from the file
    line = file.readline()

rf = Roboflow(api_key=line) # publishable api key
project = rf.workspace().project("pklot-1tros")
model = project.version(2).model

# inputs[i] = (img, x, y)
inputs = [('examples/2013-04-11_17_05_12_jpg.rf.3e4e69de371fb780750dd7da6f66a1bf.jpg',1,2),
        ('examples/2013-04-12_09_45_04_jpg.rf.420d994d449cb8ece9e0129d3e7e055f.jpg',3,2),
        ('examples/2013-04-13_12_40_07_jpg.rf.60bf51af189f410035decc69b742e2e3.jpg',102,21),
        ('examples/2013-04-14_13_45_08_jpg.rf.e40381fc0a8dd9df57571df726d4df58.jpg',12,2),
        ('examples/2013-04-15_11_10_05_jpg.rf.71cc51fdf9e703bdee93442fb2a12060.jpg',1,233)]
res = []
for img, x, y in inputs:
    a, b, p = predict_percentage(model, img) # output percentage
    res.append((x, y, a, b, p))

out_file = "output.csv"
with open(out_file, 'w', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)
    for i in res:
        csv_writer.writerow([*i])

print(f'Data has been written to {csv_file}')