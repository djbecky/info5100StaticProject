__author__ = 'DeviSnigdha'

flagJSON = []
listData = []
op = open('flagJSONfile.json','w')

with open("flagdata.csv") as f:
    for line in f:
        obj={}
        listData = line.split(',')
        obj['name'] = listData[0]
        obj['landmass'] = listData[1]
        obj['zone'] = listData[2]
        obj['area'] = listData[3]
        obj['population'] = listData[4]
        obj['language'] = listData[5]
        obj['religion'] = listData[6]
        obj['bars'] = listData[7]
        obj['stripes'] = listData[8]
        obj['colors'] = listData[9]
        obj['red'] = listData[10]
        obj['green'] = listData[11]
        obj['blue'] = listData[12]
        obj['gold'] = listData[13]
        obj['white'] = listData[14]
        obj['black'] = listData[15]
        obj['orange'] = listData[16]
        obj['mainhue'] = listData[17]
        obj['circles'] = listData[18]
        obj['crosses'] = listData[19]
        obj['saltires'] = listData[20]
        obj['quarters'] = listData[21]
        obj['sunstars'] = listData[22]
        obj['crescent'] = listData[23]
        obj['triangle'] = listData[24]
        obj['icon'] = listData[25]
        obj['animate'] = listData[26]
        obj['text'] = listData[27]
        obj['topleft'] = listData[28]
        obj['botright'] = listData[29]
        flagJSON.append(obj)


print(flagJSON[1])

op.write(str(fl))
