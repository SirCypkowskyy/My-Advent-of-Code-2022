import 'dart:io';
import 'dart:convert';

class Rucksack {
  String? compartmentA;
  String? compartmentB;

  Rucksack(this.compartmentA, this.compartmentB);

  Rucksack.fromString(String input)
  {
    compartmentA = input.substring(0, input.length ~/ 2);
    compartmentB = input.substring(input.length ~/ 2);
  }

  String findCommonLetters()
  {
    var commonLetters = "";
    var foundLetters = <String>[];
    for (var i = 0; i < compartmentA!.length; i++)
    {
      for (var j = 0; j < compartmentB!.length; j++)
      {
        if (compartmentA![i] == compartmentB![j] && !foundLetters.contains(compartmentA![i]))
        {
          commonLetters += compartmentA![i];
          foundLetters.add(compartmentA![i]);
        }
      }
    }
    return commonLetters;
  }

  static int getValueFromCodeUnit(int codeUnit)
  {
    return codeUnit >= 97 ? codeUnit - 96 : codeUnit - 38;
  }

  int findCommonLettersPriorities()
  {
    var commonLettersScore = 0;

    var foundLetters = <String>[];
    for (var i = 0; i < compartmentA!.length; i++)
    {
      for (var j = 0; j < compartmentB!.length; j++)
      {
        if (compartmentA![i] == compartmentB![j] && !foundLetters.contains(compartmentA![i]))
        {
          commonLettersScore += getValueFromCodeUnit(compartmentA![i].codeUnitAt(0));
          foundLetters.add(compartmentA![i]);
        }
      }
    }
    return commonLettersScore;
  }

}


List<String> findAllOccurrencesInThreeLines(List<String> lines) {
  var result = <String>[];
  for(var i = 0; i<lines[0].length;i++)
  {
    if(!result.contains(lines[0][i]) && lines[1].contains(lines[0][i]) && lines[2].contains(lines[0][i]))
    {
      result.add(lines[0][i]);
    }

  }
  
  return result;
}

void runPartTwo(List<String> fileContent) {
    print("Part 2");
    var score = 0;
    for(var i = 0; i<fileContent.length; i+=3)
    {
       var foundLetters = findAllOccurrencesInThreeLines([fileContent[i], fileContent[i+1], fileContent[i+2]]);
       if(foundLetters.length == 1)
       {
         // print("Found letters: ${foundLetters[0]}");
         score+= Rucksack.getValueFromCodeUnit(foundLetters[0].codeUnitAt(0));
       }
       else
          throw Exception("No letters found");
    }
    print("Score: $score");
}

void main() async {
    var fileContent = await File("data.txt").openRead().transform(utf8.decoder).transform(LineSplitter()).toList();
    var finalScore = fileContent.map((e) => Rucksack.fromString(e).findCommonLettersPriorities()).reduce((value, element) => value + element);
    print("Part 1\nFinal score: $finalScore\n");

    runPartTwo(fileContent);
}