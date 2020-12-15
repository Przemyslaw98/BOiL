export function zad1(setTable) {
    var D = [19, 17, 14];
    var O = [20, 30];
    var Kz = [11, 14, 10];
    var Cs = [30, 25];
    var Kt = [[12, 11], [9, 7], [8, 10]];
    var lock = [[false, false], [false,true], [false, false]];

    var Z = [[0, 0], [0, 0], [0, 0]];
    var T = [[0, 0], [0, 0], [0, 0]];
    var i, j;
    var D_o = [...D];
    var O_o = [...O];

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 2; j++) {
            Z[i][j] = Cs[j] - Kz[i] - Kt[i][j];
        }
    }
    for (i = 0; i < 3; i++){
        if (lock[i].includes(true)){
            for (j = 0; j < 2; j++) {
                if (lock[i][j] === false) {
                    var tmp = Math.min(D[i], O[j]);
                    D[i] -= tmp;
                    O[j] -= tmp;
                    T[i][j] += tmp;
                }
            }
        }
    }
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 2; j++) {
            if (lock[i][j] === false) {
                tmp = Math.min(D[i], O[j]);
                D[i] -= tmp;
                O[j] -= tmp;
                T[i][j] += tmp;
            }
        }
    }


    var table=[]
    while(true) {
        var alfa = [0, 0, 0];
        var beta = [0, 0];
        var doneA = [true, false, false]
        var doneB = [false, false]
        var n;
        for(n=0;n<6;n++) {
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 2; j++) {
                    if (T[i][j] > 0) {
                        if (doneA[i] === true) {
                            beta[j] = Z[i][j] - alfa[i];
                            doneB[j] = true;
                        } else if (doneB[j] === true) {
                            alfa[i] = Z[i][j] - beta[j];
                            doneA[i] = true;
                        }
                    }
                }
            }
            if (doneA.includes(false)) continue;
            if (doneB.includes(false)) continue;
            break;
        }
        var delta = [[0, 0], [0, 0], [0, 0]];
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 2; j++) {
                if (T[i][j] === 0)
                    delta[i][j] = Z[i][j] - alfa[i] - beta[j]
            }
        }
        var optimal = true
        var I,J;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 2; j++) {
                if (delta[i][j] > 0&&lock[i][j]===false) {
                    optimal = false;
                    I=i;J=j;
                    break;
                }
            }
        }
        table.push(makeTable(D_o,O_o,T,Kz,Cs,Kt));
        if (optimal === true) break;
        var Iprim,Jprim;
        var found=false;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 2; j++) {
                if(i!==I&&j!==J&&T[i][J]>0&&T[I][j]>0&&T[i][j]>0){
                    Iprim=i;Jprim=j;found=true;
                }
            }
        }
        if(found===false)break;
        tmp=Math.min(T[I][Jprim],T[Iprim][J])
        T[I][Jprim]-=tmp;T[Iprim][J]-=tmp;T[I][J]+=tmp;T[Iprim][Jprim]+=tmp;
    }
    setTable(table);
}

function makeTable(D,O,T,Kz,Cs,Kt){
    var table=[];
    table.push(D[0].toString()+'('+Kz[0]+')');
    table.push(D[1].toString()+'('+Kz[1]+')');
    table.push(D[2].toString()+'('+Kz[2]+')');
    table.push(O[0].toString()+'('+Cs[0]+')');
    table.push(T[0][0].toString()+'('+Kt[0][0]+')');
    table.push(T[1][0].toString()+'('+Kt[1][0]+')');
    table.push(T[2][0].toString()+'('+Kt[2][0]+')');
    table.push(O[1].toString()+'('+Cs[1]+')');
    table.push(T[0][1].toString()+'('+Kt[0][1]+')');
    table.push(T[1][1].toString()+'('+Kt[1][1]+')');
    table.push(T[2][1].toString()+'('+Kt[2][1]+')');
    return table;
}