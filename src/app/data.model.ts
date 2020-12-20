export class UserData {
    team_name: string;
    wins: number;
    losses: number;
    ties: number;
    score: number

    constructor(team_name: string, wins: number, losses: number, ties: number, score: number) {
      this.team_name = team_name;
      this.wins = wins;
      this.losses = losses;
      this.ties = ties;
      this.score = score
    }
  }