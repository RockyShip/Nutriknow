#!/usr/bin/python
import MySQLdb

#string = "create table nutrition (name varchar(200),"
#for i in range(30):
#	string += "n" + str(i) + " float,"
#string += "n30 float);"

#print string
#Gets Food Name & Associated ID number
f = open ("FOOD_DES.txt", "r")
food_ids = []
food_names = []
lines = f.read().split("\n")
f.close()
for line in lines:
	items = line.split("~")
	if(len(items) < 2): #dont mind this
		break;
	food_ids.append(items[1])
	food_names.append(items[5])

#Gets Each Kind of Nutrition and ID number associated
nutri_names = []
nutri_ids = []
f = open ("NUTR_DEF.txt", "r")
lines = f.read().split("\n")
f.close()
for line in lines:
	if "//" in line:
		item = line.split("~")
		#print item[7]
		#print item[1]
		nutri_names.append(item[7])
		nutri_ids.append(item[1])

#print len(nutri_ids)

f = open ("NUT_DATA.txt", "r")
data = []
row = []
curr_food_id = '01001'
for line in f:
	items = line.split("~")
	if(curr_food_id != items[1]): #finds next food item
		curr_food_id = items[1]
		data.append(row)
		row = []

	##else:
	for i in range(len(nutri_ids)):
		if(nutri_ids[i] == items[3]):
			row.append(str(i) + "-" + items[4].split("^")[1])
			break;

data.append(row) #loop above does not add very last data set

f.close()
#print data

#for i in range(len(data)):
#	print food_names[i] +"-"+ food_ids[i] + " " + str(data[i])

db = MySQLdb.connect(host="localhost", user="root",db="Nutriknow")
cur = db.cursor()

insert = "insert into nutrition";
cols = ""
values = ""

for i in range(len(data)):
	cols = "name"
	if "\"" in food_names[i]:
		food_names[i] = (food_names[i]).replace("\"","\\\"")
	values = "\""+food_names[i]+"\""
	for j in range(len(data[i])):
		cols += ", n" + (data[i][j]).split("-")[0]
		values += ", " +  (data[i][j]).split("-")[1]

	string = insert + "(" + cols + ") values (" + values + ");"

	cur.execute(string)

db.commit()
db.close()
