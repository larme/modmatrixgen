root = exports ? this

inlets = 1
outlets = 1

DATA = {
    row: 3
    column: 4
    objectname: "dial"
    object_matrix: []
    prepend_matrix: []
    if_scale: 1
    scale_matrix: []
    column_distance: 50
    row_distance: 50
    if_scripting_name: 1
    scripting_name_prefix: "matrix_control_"
    if_hide_patch_cord: 0
    }

row = (i) ->
    DATA.row = i

column = (i) ->
    DATA.column = i

objectname = (s) ->
    DATA.objectname = s

if_scripting_name = (i) ->
    DATA.if_scripting_name = i

if_scale = (i) ->
    DATA.if_scale = i

if_hide_patch_cord = (i) ->
    DATA.if_hide_patch_cord = i

clear = () ->
    empty()

bang = (b) ->
    empty()
    draw()



#####################
#
# internal functions
#
#####################

empty_matrix = (m) ->
    for r in m
        for o in r
            root.patcher.remove(o)

empty = () ->
    root.patcher.remove DATA.matrix
    empty_matrix DATA.object_matrix
    empty_matrix DATA.prepend_matrix
    empty_matrix DATA.scale_matrix

draw = () ->
    DATA.matrix = root.patcher.newdefault(100, 300, "matrix~", DATA.row, DATA.column, 0.000000000000000000001)
    DATA.object_matrix = (([i, j] for j in [0...DATA.column]) for i in [0...DATA.row])
    DATA.prepend_matrix = (([i, j] for j in [0...DATA.column]) for i in [0...DATA.row])

    if DATA.if_scale
        DATA.scale_matrix = (([i, j] for j in [0...DATA.column]) for i in [0...DATA.row])

    connect_method = if DATA.if_hide_patch_cord then "hiddenconnect" else "connect"
    
    for i in [0...DATA.row]
        for j in [0...DATA.column]
            DATA.object_matrix[i][j] =
                root.patcher.newdefault(
                    300 + j*DATA.column_distance,
                    300 + i*DATA.row_distance,
                    DATA.objectname)

            if DATA.if_scripting_name
                DATA.object_matrix[i][j].varname = "#{ DATA.scripting_name_prefix }#{ i }_#{ j }"

            inter_object = DATA.object_matrix[i][j]
            
            if DATA.if_scale
                DATA.scale_matrix[i][j] =
                    root.patcher.newdefault(
                        800 + j*120,
                        300 + i*50,
                        "scale", 0, 127, 0.0000000000001, 1.0000000000001)

                root.patcher[connect_method](
                    inter_object, 0
                    DATA.scale_matrix[i][j], 0)
                inter_object = DATA.scale_matrix[i][j]

            DATA.prepend_matrix[i][j] =
                root.patcher.newdefault(
                    500 + j*50
                    300 + i*50
                    "prepend", i, j)
            
            root.patcher[connect_method](
                inter_object, 0
                DATA.prepend_matrix[i][j], 0)
            inter_object = DATA.prepend_matrix[i][j]

            root.patcher[connect_method](
                inter_object, 0
                DATA.matrix, 0)


###################
#
# export functions
#
###################

root.bang = bang

root.clear = clear
root.row = row
root.column = column
root.objectname = objectname
root.if_scripting_name = if_scripting_name
root.if_scale = if_scale
root.if_hide_patch_cord = if_hide_patch_cord
