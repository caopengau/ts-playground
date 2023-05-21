import { greet } from "./util/greet";

const indexMapToScore = (index: number) => {
  if (index === 0) {
    return 3;
  } else if (index === 1) {
    return 2;
  }
  return 1;
};

type Ballot = string[];
enum StrategyEnum {
  FirstVoteCount = "FirstVoteCount",
  FirstToReachPoint = "FirstToReachPoint",
  NoTieBreak = "NoTieBreak",
}
type Strategy = keyof typeof StrategyEnum;

interface SortingKey {
  score: number;
  firstPlaceCount: number;
  ballotIndex: number;
}
interface CandidateScore {
  [name: string]: SortingKey;
}

const ballots: Ballot[] = [
  ["D", "B", "Z"],
  ["A", "D", "Z"],
  ["D", "A", "Z"],
  ["D", "A", "Z"],
  ["X", "A", "Z"],
  ["Y", "A", "Z"],
];

const getSortedCandidateScores = (dict: CandidateScore, strategy?: Strategy) => {
  const items: [string, SortingKey][] = Object.keys(dict).map(function (key) {
    const value = dict[key];
    return [key, value];
  });

  items.sort(function (first, second) {
    if (strategy === StrategyEnum.FirstVoteCount) {
      return second[1].score - first[1].score || second[1].firstPlaceCount - first[1].firstPlaceCount;
    } else if (strategy === StrategyEnum.FirstToReachPoint) {
      return second[1].score - first[1].score || first[1].ballotIndex - second[1].ballotIndex;
    } else {
      return second[1].score - first[1].score;
    }
  });
  return items;
};

const getResults = (ballots: Ballot[]) => {
  const candidateScores: CandidateScore = {};
  for (let i = 0; i < ballots.length; i++) {
    const ballot: Ballot = ballots[i];
    for (let j = 0; j < ballot.length; j++) {
      const candidate = ballot[j];
      if (candidateScores[candidate] === undefined) {
        candidateScores[candidate] = {
          score: indexMapToScore(j),
          firstPlaceCount: j === 0 ? 1 : 0,
          ballotIndex: i,
        };
      } else {
        candidateScores[candidate].score += indexMapToScore(j);
        if (j === 0) {
          candidateScores[candidate].firstPlaceCount += 1;
        }
        candidateScores[candidate].ballotIndex = i;
      }
    }
  }
  console.log(candidateScores);
  const sortedCandidates = getSortedCandidateScores(candidateScores, StrategyEnum.FirstToReachPoint);
  for (let index = 0; index < sortedCandidates.length; index++) {
    const candidateScore = sortedCandidates[index];
    console.log(`${candidateScore[0]}: ${candidateScore[1].score}`);
  }
  return;
};

getResults(ballots);

//  1=>3, 2=>2, 3=>1
// voting app
// function, determine the winner
/**
 * Process a list of ballots, and return all candidates sorted in descending order by their total number of points.
 */
// List<String> getResults(List<Ballot> ballots)
// deal with tie
// 1. candidate with most number of first places
// 2. candidate with most number of 1
