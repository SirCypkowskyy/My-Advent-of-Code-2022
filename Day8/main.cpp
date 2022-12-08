#include <iostream>
#include <vector>
#include <string>
#include <fstream>


enum class PART_B_DIRECTIONS {
    NORTH,
    SOUTH,
    EAST,
    WEST
};

auto getDirectionMultipliers(PART_B_DIRECTIONS direction) -> std::pair<int, int> {
    switch (direction) {
        case PART_B_DIRECTIONS::WEST:
            return std::make_pair(0, 1);
        case PART_B_DIRECTIONS::EAST:
            return std::make_pair(1, 0);
        case PART_B_DIRECTIONS::NORTH:
            return std::make_pair(0, -1);
        case PART_B_DIRECTIONS::SOUTH:
            return std::make_pair(-1, 0);
    }
}

auto main() -> int {
    std::cout << "Day 8: Treetop Tree House\n\nPart1:\nAnswer: ";
    auto dataFile = std::string("..\\data.txt");

    auto trees = std::vector<std::vector<int>>();
    auto line = std::string();
    auto file = std::fstream(dataFile);

    while (std::getline(file, line)) {
        trees.emplace_back();
        for (auto c : line) {
            trees.back().push_back(c - '0');
        }
    }

    auto visibleTrees = std::vector<std::vector<bool>>(
        trees.size(), std::vector<bool>(trees[0].size(), false)
        );

    const auto max_rows = trees.size();
    const auto max_columns = trees[0].size();

    for (int row = 0; row < trees.size(); row++) {
        visibleTrees[row][0] = true;
        visibleTrees[row][max_columns-1] = true;
    }
    for (int column = 0; column < trees[0].size() - 1; column++) {
        visibleTrees[0][column] = true;
        visibleTrees[max_rows-1][column] = true;
    }

    for (int row = 0; row < trees.size(); row++) {
        int maxOnRight = trees[row][0];
        int maxOnLeft = trees[row][max_columns - 1];
        for (int column = 0; column < trees[0].size() - 1; column++) {
            if (maxOnRight < trees[row][column+1]) {
                visibleTrees[row][column + 1] = true;
                maxOnRight = trees[row][column + 1];
            }
            if (maxOnLeft < trees[row][max_columns - column - 1 - 1]) {
                visibleTrees[row][max_columns - column - 1 - 1] = true;
                maxOnLeft = trees[row][max_columns - column - 1 - 1];
            }
        }
    }

    for (int column = 0; column < trees[0].size(); column++) {
        int maxOnDown = trees[0][column];
        int maxOnUp = trees[max_columns - 1][column];
        for (int row = 0; row < trees.size() - 1; row++) {
            if (maxOnDown < trees[row+1][column]) {
                visibleTrees[row+1][column] = true;
                maxOnDown = trees[row+1][column];
            }
            if (maxOnUp < trees[max_rows - row - 1 - 1][column]) {
                visibleTrees[max_rows - row - 1 - 1][column] = true;
                maxOnUp = trees[max_rows - row - 1 - 1][column];
            }
        }
    }


    auto visibleTreeCount = 0;
    for (const auto& row : visibleTrees) {
        for (auto column : row)
            if (column) visibleTreeCount++;
    }

    std::cout << visibleTreeCount << "\n\nPart2:\nAnswer: ";


    auto treesScenicScores = std::vector<std::vector<int>>(
        trees.size(), std::vector<int>(trees[0].size(), 1)
        );


    const auto in_bounds = [max_rows, max_columns](const int row, const int col) {
        return (row < max_rows && row >= 0 && col < max_columns && col >=0);
    };

    auto directions = std::vector<PART_B_DIRECTIONS>{
        PART_B_DIRECTIONS::WEST,
        PART_B_DIRECTIONS::EAST,
        PART_B_DIRECTIONS::NORTH,
        PART_B_DIRECTIONS::SOUTH,
    };

    for (int row = 0; row < trees.size(); row++) {
        for (int col = 0; col < trees[0].size(); col++) {
            for (const auto& directionState : directions) {
                auto direction = getDirectionMultipliers(directionState);
                int score = 0;
                auto current = std::vector<int>{row + direction.first, col + direction.second};
                while(in_bounds(current[0], current[1]) && trees[row][col] > trees[current[0]][current[1]]) {
                    score++;
                    current[0] += direction.first;
                    current[1] += direction.second;
                }
                if (in_bounds(current[0], current[1])) score++;
                treesScenicScores[row][col] *= score;
            }
        }
    }

    int best_score = 0;
    for (const auto row : treesScenicScores) {
        for(const auto ele : row) {
            best_score = std::max(best_score, ele);
        }
    }
    std::cout << best_score << '\n';

    return 0;
}
