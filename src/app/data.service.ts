import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserData } from './data.model';
import { environment } from "../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class DataService {
    data: UserData[] = [];
    dataSubject: Subject<any> = new Subject<any>();
    constructor(private http: HttpClient) { 
    }

    getData() {
        this.http.get<{ message:string; data: UserData[]}>(BACKEND_URL + "/data")
        .subscribe(res => {
            this.data = res.data;
            this.dataSubject.next(this.data);
            // console.log("result", res.message, res.data)
        });
    }

    getDataObservable() {
        return this.dataSubject.asObservable();
    }

    addData(team: string) {
        this.data.push({"team_name":team,"wins":0,"losses":0,"ties":0,"score":0});
        this.dataSubject.next(this.data);
        const Data = new UserData(team,0,0,0,0);
        
        this.http
        .post<{ message: string; data: UserData }>(
            BACKEND_URL + "/data",
            Data
        )
        .subscribe(responseData => {
            // console.log(responseData);
        });
        }

    updateWinner(winner) {
        console.log(winner)
        let updateTeams= {
            team_name: winner.team_name,
            wins: winner.wins + 1,
            losses: winner.losses,
            ties: winner.ties,
            score: winner.score + 3
        };
        this.http
        .put(BACKEND_URL + "/data/win/" + winner._id, updateTeams)
        .subscribe(response => {
            // console.log(response)
        });
    }

    updateLoser(loser) {
        // console.log("losr",loser)
        let updateTeams= {
            team_name: loser.team_name,
            wins: loser.wins,
            losses: loser.losses + 1,
            ties: loser.ties,
            score: loser.score - 1
        };
        this.http
        .put(BACKEND_URL + "/data/lose/" + loser._id, updateTeams)
        .subscribe(response => {
            // console.log(response)
        });
    }

    updateTie(team) {
        // console.log("Tie",team)
        let updateTeams= {
            team_name: team.team_name,
            wins: team.wins,
            losses: team.losses,
            ties: team.ties + 1,
            score: team.score + 1
        };
        this.http
        .put(BACKEND_URL + "/data/tie/" + team._id, updateTeams)
        .subscribe(response => {
            // console.log(response)
        });
    }
}