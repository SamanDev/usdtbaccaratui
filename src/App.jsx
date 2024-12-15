import React, { useState, useEffect } from "react";

import { Howl } from "howler";
import { Popup } from "semantic-ui-react";
import $ from "jquery";
import Info from "./components/Info";
import Loaderr from "./components/Loader";
const segments = ["PLAYER", "TIE", "BANKER"];

let _auth = null;
const loc = new URL(window.location);
const pathArr = loc.pathname.toString().split("/");

if (pathArr.length == 3) {
    _auth = pathArr[1];
}
//_auth = "farshad-HangOver2";
//console.log(_auth);

//const WEB_URL = process.env.REACT_APP_MODE === "production" ? `wss://${process.env.REACT_APP_DOMAIN_NAME}/` : `ws://${loc.hostname}:8080`;
const WEB_URL = `wss://mbaccarat.royale777.vip/`;
// (A) LOCK SCREEN ORIENTATION
const betAreas = [
    { x: "PLAYER", sidep: 2, side3: 10 },
    { x: "TIE", sidep: 2 },
    { x: "BANKER", sidep: 2, side3: 10 },
];
const betAreasX = [2, 8, 1.9];

const getcolor = (item) => {
    let def = "#000000";

    if (item == 25) {
        def = "#e57452";
    }
    if (item == "PLAYER" || item == "P") {
        def = "#e05b89";
    }
    if (item == 10) {
        def = "#8de29d";
    }
    if (item == "B3ANKER") {
        def = "#fdf65d";
    }
    if (item == "TIE" || item == "T") {
        def = "#e57452";
    }
    if (item == "BANKER" || item == "B") {
        def = "#6fc2d3";
    }

    return def;
};
const getcolortext = (item) => {
    let def = "#ffffff";
    if (parseInt(item) == 8) {
        def = "#000000";
    }
    return def;
};
const doCurrency = (value) => {
    let val = value?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return val;
};
const doCurrencyMil = (value, fix) => {
    let val = value?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return val;
    //let val;
    if (value < 1000000) {
        val = doCurrency(parseFloat(value / 1000).toFixed(fix || fix == 0 ? fix : 0)) + "K";
    } else {
        val = doCurrency(parseFloat(value / 1000000).toFixed(fix || fix == 0 ? fix : 1)) + "M";
        val = val.replace(".0", "");
    }
    return val;
};
function checkbox() {
    if ($("#cadr2:visible").length) {
        $("#cadr").show();
        $("#cadr2").hide();
    } else {
        $("#cadr2").show();
        $("#cadr").hide();
    }
}
setInterval(() => {
    checkbox();
}, 500);
function animateNum() {
    $(".counter").each(function () {
        var $this = $(this),
            countTo = $this.attr("data-count"),
            countFrom = $this.attr("start-num") ? $this.attr("start-num") : parseInt($this.text().replace(/,/g, ""));

        if (countTo != countFrom && !$this.hasClass("doing")) {
            $this.attr("start-num", countFrom);
            // $this.addClass("doing");

            $({ countNum: countFrom }).animate(
                {
                    countNum: countTo,
                },

                {
                    duration: 400,
                    easing: "linear",

                    step: function () {
                        //$this.attr('start-num',Math.floor(this.countNum));
                        $this.text(doCurrency(Math.floor(this.countNum)));
                    },
                    complete: function () {
                        $this.text(doCurrency(this.countNum));
                        $this.attr("start-num", Math.floor(this.countNum));
                        //$this.removeClass("doingdoing");
                        //alert('finished');
                    },
                }
            );
        } else {
            if ($this.hasClass("doing")) {
                $this.attr("start-num", countFrom);
                $this.removeClass("doing");
            } else {
                $this.text(doCurrency(countFrom));
                $this.attr("start-num", countFrom);
            }
        }
    });
}
const AppOrtion = () => {
    let gWidth = $("#root").width() / 1400;
    let gHight = $("#root").height() / 850;
    let scale = gWidth < gHight ? gWidth : gHight;
    let highProtect = $("#root").height() * scale;
    //console.log($("#root").width(),$("#root").height());
    // console.log(gWidth,gHight,scale);

    if (highProtect > 850) {
        //console.log(gWidth,gHight,highProtect);
        //gHight = $("#root").height() / 850;
        // scale = (scale + gHight)/2;
        scale = gHight;
        highProtect = $("#root").height() * scale;
        let _t = ($("#root").height() - highProtect) / 2;
        if (_t < 0) {
            _t = _t * -1;
        }

        if (scale < 1) {
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ")");
            }, 10);
        } else {
            scale = 1;
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ") translateY(" + _t + "px)");
            }, 10);
        }
    } else {
        // gHight = $("#root").height() / 850;
        // scale = (scale + gHight)/2;
        //  scale = gHight;
        let _t = ($("#root").height() - highProtect) / 2;
        if (_t < 0) {
            _t = _t * -1;
        }
        if (scale < 1) {
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ") translateY(" + _t + "px)");
            }, 10);
        } else {
            scale = 1;
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ") translateY(" + _t + "px)");
            }, 10);
        }
    }

    // console.log(gWidth,highProtect,gHight,scale)
};
const socket = new WebSocket(WEB_URL, _auth);
window.addEventListener("message", function (event) {
    if (event?.data?.username) {
        const payLoad = {
            method: "syncBalance",

            balance: event?.data?.balance,
        };
        try {
            socket.send(JSON.stringify(payLoad));
        } catch (error) {}
    }
});
let supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(
    orientationEvent,
    function () {
        AppOrtion();
    },
    false
);
window.parent.postMessage("userget", "*");

if (window.self == window.top) {
    //window.location.href = "https://www.google.com/";
}
let dealingSound = new Howl({
    src: ["/sounds/dealing_card_fix3.mp3"],
    volume: 0.5,
});
let chipHover = new Howl({
    src: ["/sounds/chip_hover_fix.mp3"],
    volume: 0.1,
});
let chipPlace = new Howl({
    src: ["/sounds/chip_place.mp3"],
    volume: 0.1,
});
let actionClick = new Howl({
    src: ["/sounds/actionClick.mp3"],
    volume: 0.1,
});
let defaultClick = new Howl({
    src: ["/sounds/click_default.mp3"],
    volume: 0.1,
});
let clickFiller = new Howl({
    src: ["/sounds/click_filler.mp3"],
    volume: 0.1,
});
let timerRunningOut = new Howl({
    src: ["/sounds/timer_running_out.mp3"],
    volume: 0.5,
});

// let youWin = new Howl({
//   src: ['/sounds/you_win.mp3']
// });
// let youLose = new Howl({
//   src: ['/sounds/you_lose.mp3']
// });
//$("body").css("background", "radial-gradient(#833838, #421e1e)");
let _renge = [1];
_renge.push(_renge[0] * 5);


_renge.push(_renge[0] * 25);
_renge.push(_renge[0] * 50);

_renge.push(_renge[0] * 100);

const BlackjackGame = () => {
    const [lasts, setLasts] = useState([]);
    const [gamesDataLive, setGamesDataLive] = useState([]);
    const [gameData, setGameData] = useState(null);
    const [gamesData, setGamesData] = useState([]); // Baraye zakhire JSON object

    const [gameDataLive, setGameDataLive] = useState(null); // Baraye zakhire JSON object
    const [userData, setUserData] = useState(null);

    const [last, setLast] = useState(false);
    const [chip, setChip] = useState(50);

    const [conn, setConn] = useState(true);
    const [gameId, setGameId] = useState("Baccarat01");
    const [gameTimer, setGameTimer] = useState(-1);
    const checkBets = (seat, username) => {
        let check = true;
        let userbet = gameData.players.filter((bet) => bet.seat == seat && bet.nickname == username);
        if (userbet.length) {
            check = false;
        }

        return check;
    };

    const getTotalBets = (seat) => {
        let userbet = gameData.players.filter((bet) => bet.seat == seat);
        let Total = 0;
        userbet.map(function (bet, i) {
            Total = Total + bet.amount;
        });
        return doCurrencyMil(Total);
    };
    const getBets = (seat, username) => {
        let userbet = gameData.players.filter((bet) => bet.seat == seat && bet.nickname == username);

        return userbet[0];
    };
    const haveSideBet = (sideBets, nickname, seat, mode) => {
        if (sideBets.length === 0) {
            return false;
        }
        var _have = false;
        _have = sideBets.filter((sideBet) => sideBet?.seat === seat && sideBet?.mode === mode && sideBet?.nickname === nickname);
        if (_have.length > 0) {
            _have = _have[0]?.amount;
        } else {
            _have = false;
        }

        return _have;
    };
    const getAllBetsOld = (seat, username) => {
        var userbet = gameData.players.filter((bet) => bet.seat == seat && bet.nickname != username);

        return userbet;
    };
    const getAllBets = (sideBets, username, seat, mode) => {
        var userbet = sideBets.filter((sideBet) => sideBet.seat == seat && sideBet?.mode === mode && sideBet.nickname != username);
        //var userbet = sideBets.filter((sideBet) => sideBet.seat == seat  && sideBet.nickname != username);

        return userbet;
    };

    const getPercent = (seat) => {
        let userbet;
        if (seat.x == "PLAYER") {
            userbet = lasts.filter((x) => x.p > x.b).length;
        }
        if (seat.x == "TIE") {
            userbet = lasts.filter((x) => x.p == x.b).length;
        }
        if (seat.x == "BANKER") {
            userbet = lasts.filter((x) => x.p < x.b).length;
        }

        return parseFloat((userbet / lasts.length) * 100).toFixed(0);
    };
    useEffect(() => {
        // Event onopen baraye vaghti ke websocket baz shode

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        // Event onmessage baraye daryaft data az server
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data); // Parse kardan JSON daryafti
            //console.log("Game data received: ", data);
            if (data.method == "tables") {
                // setGamesDataLive(data.games);
                // if (data.gameId === $("#gameId").text() || $("#gameId").text() === "") {
                // setGamesData(data.games);

                // Update kardan state
                // }

                setGameDataLive(data.games[0]);
                if (data.last) {
                    setTimeout(() => {
                        let _data = data.games[0];
                        localStorage.setItem(data.gameId, JSON.stringify(_data));
                    }, 3000);
                }
                // Update kardan state
            }
            if (data.method == "connect") {
                if (data.theClient?.balance >= 0) {
                    setUserData(data.theClient);
                } else {
                    setUserData(data.theClient);
                    // setConn(false);
                    //_auth = null;
                }
                // Update kardan state
            }
            if (data.method == "timer") {
                setGameTimer(data.sec);
                if (data.sec == 5) {
                    timerRunningOut.play();
                }
                // Update kardan state
            }
            if (data.method === "deal") {
                // if (data.gameId === $("#gameId").text()) {
                dealingSound.play();
                //   }
            }
            if (data.method == "lasts") {
                setLasts(data.total);
            }
        };

        // Event onclose baraye vaghti ke websocket baste mishe
        socket.onclose = () => {
            console.log("WebSocket closed");
            setConn(false);
            _auth = null;
        };

        // Cleanup websocket dar zamane unmount kardan component
        return () => {
            // socket.close();
        };
    }, []);
    useEffect(() => {
        // console.log("gameId",gameId)
        if (last) {
            $("body").css("background", "radial-gradient(#252727, #262a2b)");
        } else {
            $("body").css("background", "radial-gradient(#723883, #1e2b42)");
        }
    }, [last]);

    useEffect(() => {
        setTimeout(() => {
            AppOrtion();
        }, 500);
    }, []);
    useEffect(() => {
        if (last) {
            setGameData(JSON.parse(localStorage.getItem(gameId)));
            setTimeout(() => {
                animateNum();
            }, 100);
        } else {
            setGameData(gameDataLive);
        }

        AppOrtion();
    }, [last, gameDataLive]);
    useEffect(() => {
        setTimeout(() => {
            animateNum();
        }, 100);
        //AppOrtion();
    }, [gameData]);
    // Agar gaData nist, ye matn "Loading" neshan bede

    if (_auth == null || !conn || !gamesData || !gameData || !userData || lasts.length == 0) {
        return <Loaderr errcon={!gamesData || !gameData || !userData || lasts.length == 0 ? false : true} />;
    }
    let _countBet = 0;

    let _totalBet = 0;
    let _totalWin = 0;
    let _totalBetAll = 0;
    let _totalWinAll = 0;
    gameData.players.map(function (player, pNumber) {
        _totalBetAll = _totalBetAll + player.amount;
        _totalWinAll = _totalWinAll + player.win;
        if (player.nickname == userData.nickname) {
            _countBet = _countBet + 1;
            _totalBet = _totalBet + player.amount;
            _totalWin = _totalWin + player.win;
        }
    });
    gameData.sideBets.map(function (player, pNumber) {
        _totalBetAll = _totalBetAll + player.amount;
        _totalWinAll = _totalWinAll + player.win;
        if (player.nickname == userData.nickname) {
            _totalBet = _totalBet + player.amount;
            _totalWin = _totalWin + player.win;
        }
    });
    return (
        <>
            <span id="dark-overlay" className={gameData.win ? "curplayer" : ""}></span>
            <div>
                <div className="game-room" id="scale">
                    <div id="table-graphics"></div>
                    <Info setGameId={setGameId} gameId={gameId} totalBetAll={_totalBetAll} totalWinAll={_totalWinAll} />
                    <div id="balance-bet-box">
                        <div className="balance-bet">
                            Balance
                            <div id="balance" className="counter" data-count={userData.balance}></div>
                        </div>
                        <div className="balance-bet">
                            Yout Bets
                            <div id="total-bet" className="counter" data-count={_totalBet}></div>
                        </div>
                        <div className="balance-bet">
                            Your Wins
                            <div id="total-bet" className="counter" data-count={_totalWin}></div>
                        </div>
                        {localStorage.getItem(gameId) && (
                            <div
                                className="balance-bet"
                                onMouseEnter={() => {
                                    setLast(true);
                                }}
                                onMouseLeave={() => {
                                    setLast(false);
                                }}
                            >
                                Show Last Hand
                            </div>
                        )}
                        <div id="bets-container" className={(gameTimer < 2 && gameTimer > -1) || gameData.gameOn == true ? "nochip" : ""}>
                            {_renge.map(function (bet, i) {
                                if (bet <= userData.balance) {
                                    return (
                                        <span key={i} className={chip == bet ? "curchip" : ""}>
                                            <button
                                                className="betButtons  animate__faster animate__animated animate__zoomInUp"
                                                style={{ animationDelay: i * 100 + "ms" }}
                                                id={"chip" + i}
                                                value={bet}
                                                onClick={() => {
                                                    setChip(bet);
                                                }}
                                            >
                                                {doCurrencyMil(bet)}
                                            </button>
                                        </span>
                                    );
                                } else {
                                    return (
                                        <span key={i} className={chip == bet ? "curchip" : ""}>
                                            <button className="betButtons noclick noclick-nohide animate__animated animate__zoomInUp" style={{ animationDelay: i * 100 + "ms" }} id={"chip" + i} value={bet}>
                                                {doCurrencyMil(bet)}
                                            </button>
                                        </span>
                                    );
                                }
                            })}
                        </div>
                    </div>

                    <div id="volume-button">
                        <i className="fas fa-volume-up"></i>
                    </div>
                    {gameTimer >= 1 && !gameData.gameOn && gameData.gameStart && (
                        <div id="deal-start-label">
                            <p className="animate__bounceIn animate__animated animate__infinite" style={{ animationDuration: "1s" }}>
                                Waiting for bets <span>{gameTimer}</span>
                            </p>
                        </div>
                    )}
                    {gameData.win && (
                        <div id="deal-win-label">
                            <p className="animate__bounceIn animate__animated " style={{ animationDuration: "1s" }}>
                                {gameData.win != "TIE" ? <>{gameData.win} WINS</> : <>{gameData.win}</>}{" "}
                                <span>
                                    {gameData.player.sum}-{gameData.banker.sum}
                                </span>
                            </p>
                        </div>
                    )}
                    <div id="lasts">
                        {lasts.length > 0 && (
                            <div className="lasts-cards">
                                {lasts.map(function (x, i) {
                                    if (i < 50) {
                                        let card = x.b > x.p ? "B" : x.b == x.p ? "T" : "P";
                                        return (
                                            <div className="visibleCards animate__fadeIn animate__animated" key={i} style={{ animationDelay: (i + 1) * 90 + "ms", background: getcolor(card), color: getcolortext(card) }}>
                                                {card} {x.p}/{x.b}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        )}
                    </div>
                    <div className="grid-container">
                        <div className="grid-item">
                            <div id="dealer">
                                <h1>PLAYER</h1>
                                {gameData.player?.cards.length > 0 && <div id="dealerSum" className={gameData.win == null ? "counter" : gameData.win == "PLAYER" ? "result-win counter" :gameData.win == "TIE"?"result-drow counter" : " result-lose  counter"} data-count={gameData.player?.sum}></div>}
                                {gameData.player?.cards.length > 0 && (
                                    <div className="dealer-cards" style={{ marginLeft: (gameData.player?.cards.length < 3 ? gameData.player?.cards.length : 2) * -45 }}>
                                        <div className="visibleCards">
                                            {gameData.player?.cards.map(function (card, i) {
                                                let _dClass = "animate__flipInY";
                                                if (i === 2) {
                                                    _dClass = "animate__flipInX";
                                                }
                                                return (
                                                    <span key={i} className={_dClass + " animate__animated   dealerCardImg"}>
                                                        <img className={" animate__animated dealerCardImg"} style={i == 2 ? { transform: "rotate(90deg) translateY(140px) translateX(40px)" } : {}} alt={card.suit + card.value.card} src={"/imgs/" + card.suit + card.value.card + ".svg"} />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid-item">
                            <div id="dealer">
                                <h1>BANKER</h1>
                                {gameData.banker?.cards.length > 0 && <div id="dealerSum" className={gameData.win == null ? "counter" : gameData.win == "BANKER" ? "result-win counter" : gameData.win == "TIE"?"result-drow counter" :"result-lose counter"} data-count={gameData.banker?.sum}></div>}
                                {gameData.banker?.cards.length > 0 && (
                                    <div className="dealer-cards" style={{ marginLeft: (gameData.banker?.cards.length < 3 ? gameData.banker?.cards.length : 2) * -45 }}>
                                        <div className="visibleCards">
                                            {gameData.banker?.cards.map(function (card, i) {
                                                let _dClass = "animate__flipInY";
                                                if (i === 2) {
                                                    _dClass = "animate__flipInX";
                                                }
                                                return (
                                                    <span key={i} className={_dClass + " animate__animated   dealerCardImg"}>
                                                        <img className={" animate__animated dealerCardImg"} style={i == 2 ? { transform: "rotate(90deg) translateY(140px) translateX(40px)" } : {}} alt={card.suit + card.value.card} src={"/imgs/" + card.suit + card.value.card + ".svg"} />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div id="players-container">
                        {betAreas.map(function (player, pNumber) {
                            let _resClass = "";
                            let _resCoinClass = "animate__slideInDown";
                            let _res = "";

                            let pBet = getBets(pNumber, userData.nickname);
                            let allBetold = getAllBetsOld(pNumber, userData.nickname);
                            if (pBet) {
                                pBet.bet = pBet.amount;
                            }
                            var sidePP = haveSideBet(gameData.sideBets, userData.nickname, pNumber, "Pair");

                            var allBet = getAllBets(gameData.sideBets, userData.nickname, pNumber, "Pair");
                            var sidePPPlayer = haveSideBet(gameData.sideBets, userData.nickname, pNumber, "Pair");

                            var side213 = haveSideBet(gameData.sideBets, userData.nickname, pNumber, "3card");
                            var side213layer = haveSideBet(gameData.sideBets, userData.nickname, pNumber, "3card");
                            var allBet21 = getAllBets(gameData.sideBets, userData.nickname, pNumber, "3card");
                            return (
                                <span id={"slot" + pNumber} className={gameData.status == "Done" && gameData.gameOn && gameData.win == player.x ? "players result-win" : gameData.status == "Done" && gameData.gameOn ? "players" : "players"} key={pNumber} style={getTotalBets(pNumber) == "0K" && gameData.gameOn ? { opacity: 0.9 } : {}}>
                                    <div
                                        onClick={() => {
                                            chipPlace.play();
                                            $("#slot" + pNumber + " > .betButtons").addClass("noclick-nohide");

                                            socket.send(JSON.stringify({ method: "bet", amount: chip, theClient: userData, gameId: gameData.id, seat: pNumber }));
                                        }}
                                        className={gameData.gameOn || chip > userData.balance || pBet ? "active noclick empty-slot" : "empty-slot"}
                                        style={{ background: getcolor(player.x), color: getcolortext(player.x) }}
                                    >
                                        <span className={pBet ? "gotop betetx" : "betetx"}>{player.x}</span>
                                    </div>
                                    {allBetold.length > 0 && (
                                        <div className={"player-coin all"}>
                                            {allBetold.map(function (player, pNumber) {
                                                return (
                                                    <Popup
                                                        key={pNumber}
                                                        size="mini"
                                                        inverted
                                                        on="hover"
                                                        trigger={
                                                            <button className="betButtons animate__animated animate__zoomInDown" style={{ animationDelay: (pNumber + 1) * 50 + "ms", left: pNumber * -5, top: pNumber * 10 }} id={"chip" + _renge.findIndex((bet) => bet == player.amount)}>
                                                                {doCurrencyMil(player.amount)}
                                                            </button>
                                                        }
                                                        content={
                                                            <div style={{ minWidth: 120 }}>
                                                                <img src={"/imgs/avatars/" + player?.avatar + ".webp"} style={{ height: 30, marginRight: 10, float: "left" }} />
                                                                {player.nickname}
                                                                <br />
                                                                <small>{doCurrencyMil(player.amount)}</small>
                                                            </div>
                                                        }
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                    {pBet && (
                                        <div className={"player-coin"}>
                                            <button className="betButtons noclick animate__animated animate__rotateIn" id={"chip" + _renge.findIndex((bet) => bet == pBet.bet)}>
                                                {doCurrencyMil(pBet.bet)}
                                            </button>
                                        </div>
                                    )}
                                    <div id="bets-container-left">
                                        <span className={gameData.seats[pNumber]?.sidep > 0 ? "winner" : ""}>
                                            {gameData.seats[pNumber]?.sidep > 0 && <div className={sidePPPlayer?"goup bets-side-win animate__animated animate__slideInUp":"bets-side-win animate__animated animate__slideInUp"}>x{gameData.seats[pNumber]?.sidep}</div>}

                                            <button
                                                onClick={() => {
                                                    if (!gameData.gameOn && !sidePPPlayer) {
                                                        $("#slot" + pNumber + "  #bets-container-left .betButtons").addClass("noclick-nohide");
                                                        chipPlace.play();
                                                        socket.send(JSON.stringify({ method: "sidebet", amount: chip, theClient: userData, gameId: gameData.id, seat: pNumber, mode: "Pair" }));
                                                    }
                                                }}
                                                className={sidePPPlayer || chip > userData.balance || gameData.gameOn ? "betButtons place noclick-nohide" : "betButtons place"}
                                            >
                                                <span className={sidePPPlayer ? "gotop betetx" : "betetx"}>{pNumber==1?<>Perfect<br/>Pair</>:"PAIR"}</span>
                                            </button>
                                            {sidePPPlayer && (
                                                <button className="betButtons placebet noclick animate__animated animate__rotateIn" id={"chip" + _renge.findIndex((bet) => bet === sidePPPlayer)}>
                                                    {doCurrencyMil(sidePPPlayer)}
                                                </button>
                                            )}
                                            {allBet.length > 0 && (
                                                <div className={"player-coin all left"}>
                                                    {allBet.map(function (player, pNumber) {
                                                        return (
                                                            <Popup
                                                                key={pNumber}
                                                                size="mini"
                                                                inverted
                                                                trigger={
                                                                    <button className="betButtons  animate__animated animate__zoomInDown" style={{ animationDelay: (pNumber + 1) * 50 + "ms", left: pNumber * 5, top: pNumber * -15 }} id={"chip" + _renge.findIndex((bet) => bet == player.amount)}>
                                                                        {doCurrencyMil(player.amount)}
                                                                    </button>
                                                                }
                                                                content={
                                                                    <div style={{ minWidth: 120 }}>
                                                                        <img src={"/imgs/avatars/" + player?.avatar + ".webp"} style={{ height: 30, marginRight: 10, float: "left" }} />
                                                                        {player.nickname}
                                                                        <br />
                                                                        <small>{doCurrencyMil(player.amount)}</small>
                                                                    </div>
                                                                }
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    <div id="bets-container-right">
                                        <span className={gameData.seats[pNumber]?.side3 > 0 ? "winner" : ""}>
                                            {gameData.seats[pNumber]?.side3 > 0 && <div className={side213layer?"goup bets-side-win animate__animated animate__slideInUp":"bets-side-win animate__animated animate__slideInUp"}>x{gameData.seats[pNumber]?.side3}</div>}
                                            <button
                                                onClick={() => {
                                                    if (!gameData.gameOn && !side213layer) {
                                                        $("#slot" + pNumber + "  #bets-container-right .betButtons").addClass("noclick-nohide");
                                                        chipPlace.play();
                                                        socket.send(JSON.stringify({ method: "sidebet", amount: chip, theClient: userData, gameId: gameData.id, seat: pNumber, mode: "3card" }));
                                                    }
                                                }}
                                                className={side213layer || chip > userData.balance || gameData.gameOn? "betButtons place noclick-nohide" : "betButtons place"}
                                            >
                                                <span className={side213layer ? "gotop betetx" : "betetx"}>{pNumber==1?<>Either<br/>Pair</>:"3 CARD"}</span>
                                            </button>
                                            {side213layer && (
                                                <button className="betButtons placebet noclick animate__animated animate__rotateIn" id={"chip" + _renge.findIndex((bet) => bet === side213layer)}>
                                                    {doCurrencyMil(side213layer)}
                                                </button>
                                            )}

                                            {allBet21.length > 0 && (
                                                <div className={"player-coin all right"}>
                                                    {allBet21.map(function (player, pNumber) {
                                                        return (
                                                            <Popup
                                                                key={pNumber}
                                                                size="mini"
                                                                inverted
                                                                on="hover"
                                                                trigger={
                                                                    <button className="betButtons  animate__animated animate__zoomInDown" style={{ animationDelay: (pNumber + 1) * 50 + "ms", left: pNumber * -5, top: pNumber * -15 }} id={"chip" + _renge.findIndex((bet) => bet == player.amount)}>
                                                                        {doCurrencyMil(player.amount)}
                                                                    </button>
                                                                }
                                                                content={
                                                                    <div style={{ minWidth: 120 }}>
                                                                        <img src={"/imgs/avatars/" + player?.avatar + ".webp"} style={{ height: 30, marginRight: 10, float: "left" }} />
                                                                        {player.nickname}
                                                                        <br />
                                                                        <small>{doCurrencyMil(player.amount)}</small>
                                                                    </div>
                                                                }
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </span>
                                    </div>

                                    <div className="percent">
                                        {gameData.gameOn ? (
                                            <>
                                                <b>{getTotalBets(pNumber)}</b>
                                                <br />
                                                Total Bets
                                            </>
                                        ) : (
                                            <>
                                                <b>{getPercent(player)}%</b>
                                                <br />
                                                in Last {lasts.length}
                                            </>
                                        )}
                                    </div>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlackjackGame;
