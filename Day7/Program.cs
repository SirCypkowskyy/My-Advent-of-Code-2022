using System.Collections;
using System.Text;

class Program
{
    static TaskFolder Task1Root = new TaskFolder("/");

    static TaskFolder CurrentFolder = Task1Root;


    static readonly int DISK_SPACE = 70000000;
    static readonly int SPACE_NEEDED_FOR_UPDATE = 30000000;

    static bool ShowLinesExecution = false;

    static void InterpretLine(string line)
    {
        if(ShowLinesExecution)
            Console.WriteLine("New line: " + line);
        switch (line)
        {
            case string action when action.StartsWith("$"):
                
                switch(action)
                {
                    case string targetFolder when targetFolder.StartsWith("$ cd "):
                        if(ShowLinesExecution)
                        {
                            Console.WriteLine("Available subfolders:");
                            CurrentFolder.SubFolders.ForEach(folder => Console.WriteLine(folder.Name));
                        }

                        targetFolder = targetFolder.Replace("$ cd ", "");
                        
                        if (targetFolder == "..")
                        {
                            CurrentFolder = CurrentFolder.Parent;
                        }
                        else if(targetFolder == "/")
                        {
                            CurrentFolder = Task1Root;
                        }
                        else
                            CurrentFolder = CurrentFolder.GetFolder(targetFolder);

                        if (ShowLinesExecution)
                            Console.WriteLine("New current dir: " + CurrentFolder.Name);

                        break;
                        
                    case string actionSpecific when actionSpecific.StartsWith("$ ls"):
                        if (ShowLinesExecution)
                            Console.WriteLine("New LS:\n");
                        if (ShowLinesExecution)
                            Console.WriteLine(CurrentFolder);
                        
                        break;
                       
                    default:
                        throw new Exception("Unknown action: " + action);
                }
                break;
            case string action when action.StartsWith("dir"):
                action = action.Replace("dir ", "");
                CurrentFolder.AddSubFolder(new TaskFolder(action, CurrentFolder));
                break;
            case string potentialNewFileTask when Char.IsDigit(potentialNewFileTask[0]):
                var fileSize = int.Parse(potentialNewFileTask.Split(' ')[0]);
                var fileName = potentialNewFileTask.Split(' ')[1];
                CurrentFolder.AddFile(new TaskFile(fileName, fileSize));
                break;
            default:
                throw new Exception("Unknown action: " + line);
        }

        if (CurrentFolder == null)
        {
            throw new Exception("Current folder is null!");
        }
    }
    

    static void Main(string[] args)
    {
        ShowLinesExecution = false;
        Console.WriteLine("--- Day 7: No Space Left On Device ---");
        Console.WriteLine("Part 1:");
        var dirsWithProperSize = new List<TaskFolder>();
        var instructions = File.ReadLines(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\data.txt"));
        instructions.ToList().ForEach(line => InterpretLine(line));

        var sum = 0;
        
        foreach (var folder in Task1Root.SubFolders)
        {
            sum += folder.GetTotalSize();
        }


        Console.WriteLine("Answer: " + Task1Root.GetTotalSize());


        Console.WriteLine("\nPart 2:");

        var sum2 = 0;

        Console.WriteLine("Answer: " + Task1Root.GetSmallestFolderFreeingRequiredMemory(Task1Root, Task1Root.GetSize()).GetSize());
    }

    internal class TaskFolder
    {
        public string Name { get; private set; }
        public List<TaskFolder> SubFolders { get; private set; }

        public List<TaskFile> FilesInFolder { get; private set; }

        public TaskFolder? Parent { get; private set; }

        public TaskFolder(string name)
        {
            Name = name;
            SubFolders = new List<TaskFolder>();
            FilesInFolder = new List<TaskFile>();
            Parent = null;
        }

        public TaskFolder(string name, TaskFolder parent)
        {
            Name = name;
            SubFolders = new List<TaskFolder>();
            FilesInFolder = new List<TaskFile>();
            Parent = parent;
        }

        public void AddSubFolder(TaskFolder subFolder)
        {
            SubFolders.Add(subFolder);
        }
        public void AddFile(TaskFile file)
        {
            FilesInFolder.Add(file);
        }
        
        public int GetSize()
        {
            return FilesInFolder.Sum(x => x.Size) + SubFolders.Sum(x => x.GetSize());
        }
        
        public int GetTotalSize()
        {
            var finalSum = 0;
            if(GetSize() <= 100000)
            {
                finalSum += GetSize();
            }
            SubFolders.ForEach(x => finalSum += x.GetTotalSize());

            return finalSum;
        }

        public TaskFolder GetSmallestFolderFreeingRequiredMemory(TaskFolder smallestFolder, int occupiedSize)
        {
            var listOfSmallestAccepted = new List<TaskFolder>();

            foreach (var child in smallestFolder.SubFolders)
            {
                if (DISK_SPACE - (occupiedSize - child.GetSize()) >= SPACE_NEEDED_FOR_UPDATE)
                {
                    listOfSmallestAccepted.Add(child);
                    var smallest = child.GetSmallestFolderFreeingRequiredMemory(child, occupiedSize);
                    if (smallest != null)
                        listOfSmallestAccepted.Add(smallest);
                }
                else
                {
                    if (child.SubFolders.Count > 0)
                    {
                        var smallestChild = child.GetSmallestFolderFreeingRequiredMemory(child, occupiedSize);
                        if (smallestChild != null)
                            listOfSmallestAccepted.Add(smallestChild);
                    }
                }
            }

            return listOfSmallestAccepted.Find(x => x.GetSize() == listOfSmallestAccepted.Min(y => y.GetSize()));
        }


        public override string ToString()
        {
            var parent = Parent;
            if (parent != null)
            {
                Console.WriteLine("Parent folders:");
            }
            while (parent != null)
            {
                Console.WriteLine(parent.Name);
                parent = parent.Parent;
            }
            return IterativeToString();
        }
        
        public string IterativeToString(int level = 0)
        {
            var builder = new StringBuilder(new string('\t', level) + "- " + Name + " (dir)\n");
            if(SubFolders.Count > 0)
                SubFolders.ForEach(folder => builder.AppendLine(folder.IterativeToString(level+1)));

            if (FilesInFolder.Count > 0)
                FilesInFolder.ForEach(file => builder.AppendLine(new string('\t', level+1) + file.ToString()));

            return builder.ToString();
        }

        public TaskFolder GetFolder(string name)
        {
            if (name == Name && name == "/")
            {
                return this;
            }
            else
            {
               return SubFolders.Find(x => x.Name == name);
            }
        }
    }


    internal class TaskFile
    {
        public string Name { get; private set; }
        public int Size { get; private set; }

        public TaskFile(string name, int size)
        {
            Name = name;
            Size = size;
        }

        public override string ToString()
        {
            return "- " + Name + " (size=" + Size + ")";
        }
    }
}