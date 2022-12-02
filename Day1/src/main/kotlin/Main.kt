import java.io.File

fun main(args: Array<String>) {
    val dataFromOurFile = File("input.txt").bufferedReader().readLines()
    val sums = ArrayList<Int>()
    var lastSum = 0;
    for(element in dataFromOurFile)
    {
        if(element.isNotBlank())
            lastSum += Integer.parseInt(element)
        else
        {
            if(lastSum == 0)
                return
            sums.add(lastSum)
            lastSum = 0
        }
    }
    println(sums.maxOrNull() ?: 0)
    println("Zadanie 2")
    println(sums.asSequence().sortedDescending().take(3).sum())
}