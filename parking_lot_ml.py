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

imgs = [] # input list
res = []
for img in imgs:
    a, b, p = predict_percentage(model, img) # output percentage
    res.append((a,b,p))

out_file = "output.csv"
with open(out_file, 'w', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)
    for i in range(res):
        csv_writer.writerow([*i])

print(f'Data has been written to {csv_file}')