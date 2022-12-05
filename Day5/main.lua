dofile("./stack.lua")

local function lines_from(file)
    local lines = {}
    for line in io.lines(file) do
        lines[#lines + 1] = line
    end
    return lines
end

local lines = lines_from("data.txt")
local builtStackDict = {
    ['0'] = {
        ['index'] = -1,
        ['value'] = -1,
        ['stack'] = Stack()
    }
}
local builtStackDictFreeIndex = 1

local line = lines[#lines]

for i = 1, #line do
    if line:sub(i, i) ~= ' ' and line:sub(i, i) ~= '[' and line:sub(i, i) ~= ']' then
        builtStackDict[builtStackDictFreeIndex] = {
            ['index'] = i,
            ['value'] = line:sub(i, i),
            ['stack'] = Stack()
        }
        builtStackDictFreeIndex = builtStackDictFreeIndex + 1
    end
end

for i = 1, #lines - 1 do
    local line = lines[i]
    for k, v in pairs(builtStackDict) do
        if k ~= '0' then
            if line:sub(v.index, v.index) ~= ' ' then
                v.stack:push(line:sub(v.index, v.index))
                else
            end
        end    
    end
end


for k, v in pairs(builtStackDict) do
    v.stack:reverse()
end


local longestStack = 0
for k, v in pairs(builtStackDict) do
    if v.stack:size() > longestStack then
        longestStack = v.stack:size()
    end
end


local tasksToComplete = lines_from("instructions.txt")

for i = 1, #tasksToComplete do
    local result = {}
    local task_parts = string.gmatch(tasksToComplete[i], "[^%s]+")

    for part in task_parts do
        result[#result + 1] = part
    end

    local num_of_pops = tonumber(result[2])
    local source_of_pops = tonumber(result[4])
    local destination_of_pops = tonumber(result[6])

    local source_stack = builtStackDict[source_of_pops].stack
    local destination_stack = builtStackDict[destination_of_pops].stack
    local local_stack = Stack()
    for i = 1, num_of_pops do
        destination_stack:push(source_stack:pop())
    end
end

print("Final Result:")
for k, v in pairs(builtStackDict) do
    io.write(v.stack:pop())
end
print(' ')