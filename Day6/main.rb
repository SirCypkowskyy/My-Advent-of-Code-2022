puts "Day 6: Tuning Trouble\n\nPart 1:"

def checkIfArrayIsMadeOfUniqueChars(array)
  array.each do |char|
    if array.count(char) > 1
      return false
    end
  end
  return true
end

lines = File.readlines("data.txt")


iteration = 0
for i in 0..lines.length-1
  for j in 0..lines[i].length-1
    first_four_chars_from_j = lines[i][j..j+3]
    if checkIfArrayIsMadeOfUniqueChars(first_four_chars_from_j.split(""))
      iteration += 1
      break
    end
    iteration += 1
  end
end

# +3 because we look for the last char in the sequence
puts "Result: #{iteration+3}"

## Part 2
puts "\nPart 2:"
iteration = 0
for i in 0..lines.length-1
  for j in 0..lines[i].length-1
    first_14_chars_from_j = lines[i][j..j+13]
    if checkIfArrayIsMadeOfUniqueChars(first_14_chars_from_j.split(""))
      iteration += 1
      break
    end
    iteration += 1
  end
end
# +13 because we look for the last char in the sequence
puts "Result: #{iteration+13}"
