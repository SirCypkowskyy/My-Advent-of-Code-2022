Write-Host "Day4 - Part1"

$dataFromFile = Get-Content .\data.txt

$collectionOfPairs = @(
    $dataFromFile -split ","
)

$fullyContainedNum = 0


for ($i = 0; $i -lt $collectionOfPairs.Count; $i+=2) {
    $a_range = $collectionOfPairs[$i].Split("-")
    $b_range = $collectionOfPairs[$i+1].Split("-")

    if (([int]$a_range[0] -le [int]$b_range[0]) -and ([int]$a_range[1] -ge [int]$b_range[1]) -or (([int]$b_range[0] -le [int]$a_range[0]) -and ([int]$b_range[1] -ge [int]$a_range[1]))) {
        # Write-Host "Fully contained pair: $($collectionOfPairs[$i]) and $($collectionOfPairs[$i+1])"
        $fullyContainedNum += 1
    }
}

Write-Host "Number of fully contained pairs: $fullyContainedNum"
Write-Host "Day4 - Part2"

$partiallyContainedNum = 0

for ($i = 0; $i -lt $collectionOfPairs.Count; $i+=2) {
    $a_range = $collectionOfPairs[$i].Split("-")
    $b_range = $collectionOfPairs[$i+1].Split("-")

    if((([int]$a_range[0] -le [int]$b_range[0]) -and ([int]$a_range[1] -ge [int]$b_range[0])) -or (([int]$b_range[0] -le [int]$a_range[0]) -and ([int]$b_range[1] -ge [int]$a_range[0]))) {
        # Write-Host "Partially contained pair: $($collectionOfPairs[$i]) and $($collectionOfPairs[$i+1])"
        $partiallyContainedNum += 1
    }
}

Write-Host "Number of partially contained pairs: $partiallyContainedNum"