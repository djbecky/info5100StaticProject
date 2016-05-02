__author__ = 'DeviSnigdha'

import json
import itertools
from pprint import pprint

def get_longlat(flag,countries):

    longlat = []
    for country in countries:
        if country["name"] == flag["name"]:
            longlat.append(float(country["longitude"]))
            longlat.append(float(country["latitude"]))

    return longlat

def get_all_colors(country):
    color_list = []

    val = ["red", "green", "gold", "blue", "green", "black", "white", "orange"]

    for color in val:
        if int(country[color]) == 1:
            color_list.append(color)

    return color_list

def get_all_shapes(country):
    shapes_list = []

    val = ["circles", "crosses", "saltires", "quarters", "sunstars", "crescent", "triangle", "icon", "animate", "text"]

    for shape in val:
        if int(country[shape]) > 0:
            shapes_list.append((shape,int(country[shape])))

    return shapes_list

def get_language(country):

    values = ["English" , "Spanish","French", "German","Slavic",
           "Other Indo-European", "Chinese", "Arabic" , "Japanese/Turkish/Finnish/Magyar", "Others"]

    lang = values[int(country["language"])-1]

    return lang

def get_religion(country):

    values = ["Catholic", "Other Christian", "Muslim", "Buddhist", "Hindu", "Ethnic", "Marxist", "Others"]
    reli = values[int(country["religion"])]

    return reli

def get_continent(cont):
    continents= ["N.America", "S.America", "Europe", "Africa", "Asia", "Oceania"]
    cont_name = continents[int(cont)-1]
    return cont_name

def get_cont_color(clean_flags):
    #Viz1 Continent vs Colors
    cont_colors_dict = dict()

    for cont in clean_flags:
        if cont["continent"] not in cont_colors_dict:
            cont_colors_dict[cont["continent"]] = []
        cont_colors_dict[cont["continent"]].append(cont["mainhue"])

    cont_colors = []
    obj = {}
    for cont in cont_colors_dict:
        obj["name"] = cont
        obj["color"] = cont_colors_dict[cont]
        obj["size"] = len(cont_colors_dict[cont])
        cont_colors.append(obj)
        obj = {}

    with open('cont_color.json', 'w') as outfile:
        json.dump(cont_colors, outfile)

def get_reli_color(clean_flags):
    #Viz2 Religion vs Color
    reli_colors_dict = dict()

    for cont in clean_flags:
        if cont["religion"] not in reli_colors_dict:
            reli_colors_dict[cont["religion"]] = []
        reli_colors_dict[cont["religion"]].append(cont["mainhue"])

    reli_colors = []
    obj = {}
    for cont in reli_colors_dict:
        obj["religion"] = cont
        obj["color"] = reli_colors_dict[cont]
        reli_colors.append(obj)
        obj = {}

    with open('religion_color.json', 'w') as outfile:
        json.dump(reli_colors, outfile)

def get_cont_shape(clean_flags):
    #Viz3 Continent vs Shape
    cont_shape_dict = dict()

    for cont in clean_flags:
        if cont["continent"] not in cont_shape_dict:
            cont_shape_dict[cont["continent"]] = []
        if len(cont["allShapes"]) > 0:
            for shape,count in cont["allShapes"]:
                shapes = [shape] * count
                cont_shape_dict[cont["continent"]]+=shapes

    cont_shape = []
    obj = {}
    for cont in cont_shape_dict:
        obj["continent"] = cont
        obj["shape"] = cont_shape_dict[cont]
        cont_shape.append(obj)
        obj = {}


    with open('cont_shape.json', 'w') as outfile:
        json.dump(cont_shape, outfile)

def get_reli_shape(clean_flags):
    #Viz4 Religion vs Shape
    reli_shape_dict = dict()

    for cont in clean_flags:
        if cont["religion"] not in reli_shape_dict:
            reli_shape_dict[cont["religion"]] = []
        if len(cont["allShapes"]) > 0:
            for shape,count in cont["allShapes"]:
                shapes = [shape] * count
                reli_shape_dict[cont["religion"]]+=shapes

    reli_shape = []
    obj = {}
    for cont in reli_shape_dict:
        obj["religion"] = cont
        obj["shape"] = reli_shape_dict[cont]
        reli_shape.append(obj)
        obj = {}

    with open('religion_shape.json', 'w') as outfile:
        json.dump(reli_shape, outfile)

#5. N_Countries vs N_Colors
def get_num_ctry_color(clean_flags):
    N_ctry_color = [0] * 8

    for flag in clean_flags:
        i = int(flag["n_colors"])
        N_ctry_color[i-1] += 1

    obj = {}
    num_color_ctry = []
    for i in range(len(N_ctry_color)):
        obj["n_color"] = i + 1
        obj["n_ctry"] = N_ctry_color[i]
        num_color_ctry.append(obj)
        obj={}

    with open('num_color_ctry.json', 'w') as outfile:
        json.dump(num_color_ctry, outfile)

#5. N_Countries vs N_Shapes
def get_num_ctry_shapes(clean_flags):
    N_ctry_shapes = [0] * 10

    for flag in clean_flags:
        i = int(len(flag["allShapes"]))
        N_ctry_shapes[i-1] += 1

    obj = {}
    num_ctry_shape = []
    for i in range(len(N_ctry_shapes)):
        obj["n_shapes"] = i + 1
        obj["n_ctry"] = N_ctry_shapes[i]
        num_ctry_shape.append(obj)
        obj={}

    with open('num_ctry_shape.json', 'w') as outfile:
        json.dump(num_ctry_shape, outfile)

def get_ctry_color_rainbow(clean_flags):
    val = ["red", "green", "gold", "blue", "green", "black", "white", "orange"]
    ctry_color_dict = {}

    for flag in clean_flags:
        col = flag['mainhue']
        if col in ctry_color_dict:
            ctry_color_dict[col] += 1
        else:
            ctry_color_dict[col] = 1

    ctry_color_list = []
    obj = {}
    for k in ctry_color_dict:
        ctry_color_list.append({
            'color' : k,
            'count' : ctry_color_dict[k]
         })

    with open('ctry_color_list.json', 'w') as outfile:
        json.dump(ctry_color_list, outfile)



##########__main__##########
with open('flagJSONfile.json') as data_file:
    country_data = json.load(data_file)

with open('countries.json') as data_file:
    coordinates = json.load(data_file)

clean_flags = []
ctry_iter = iter(country_data)
next(ctry_iter)

for ctry in ctry_iter:
    country = {}
    country["continent"] = get_continent(ctry["landmass"])
    country["name"] = ctry["name"]
    country["mainhue"] = ctry["mainhue"]
    country["allColors"] = get_all_colors(ctry)
    country["n_colors"] = ctry["colors"]
    country["allShapes"] = get_all_shapes(ctry)
    country["language"] = get_language(ctry)
    country["religion"] = get_religion(ctry)
    country["longlat"] = get_longlat(ctry,coordinates)
    clean_flags.append(country)

with open('cleanFlags.json', 'w') as outfile:
    json.dump(clean_flags, outfile)



#Visualizations

#1. Continent vs Color
get_cont_color(clean_flags)

#2. Religion vs Color
get_reli_color(clean_flags)

#3. Continent vs Shape
get_cont_shape(clean_flags)

#4. Religion vs Shape
get_reli_shape(clean_flags)

#5. N_Countries vs N_Colors
get_num_ctry_color(clean_flags)

#6. N_Countries vs N_Shapes
get_num_ctry_shapes(clean_flags)

#7. N_Countries vs Color
get_ctry_color_rainbow(clean_flags)