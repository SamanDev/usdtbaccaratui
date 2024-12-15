import React from "react";
import { ModalContent, Button, Icon, Modal } from "semantic-ui-react";

const doCurrency = (value) => {
    let val = value?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return val;
};
const doCurrencyMil = (value, fix) => {
    let val;
    if (value < 1000000) {
        val = doCurrency(parseFloat(value / 1000).toFixed(fix || fix === 0 ? fix : 0)) + "K";
    } else {
        val = doCurrency(parseFloat(value / 1000000).toFixed(fix || fix === 0 ? fix : 1)) + "M";
        val = val.replace(".0", "");
    }
    if (value === 0) {
        return 0;
    }
    return val;
};
const ModalExampleScrollingContent = (prop) => {
    const [open, setOpen] = React.useState(false);

    return (
        <span id="leave-button">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                size="tiny"
                trigger={
                    <Button basic inverted color="grey" size="mini" style={{ position: "relative", display: "block" }} id="sidebetbtn" icon labelPosition="left">
                        <Icon name="info" />
                        How to Play
                    </Button>
                }
            >
                <ModalContent scrolling>
                    <article>
                        <h1>How to Play Baccarat</h1>
                        <h2>Game Overview</h2>

                        <p>Baccarat is a card game played using eight standard 52-card decks.<br/>
                        The game consists of two hands, Player and Banker.<br/>
                        Each card has a represented point value.<br/>
                        The value of a hand is determined by adding together the point value of each card within each hand. Anytime a hand total exceeds 9, the tens digit of the hand total is ignored (13 = 3).<br/>
                        The initial hand value (two cards) will determine whether a third card will be drawn for each hand (see 3rd Card Determination below).<br/>
                        After both hands have achieved their final total, the higher hand will be declared the winner.<br/>
                        In the case of a tie the Player and Banker bets will “push”.</p>

                        <h2>Card Point Value</h2>
                        <p>There are four suits of cards: Spades, Hearts, Diamonds and Clubs. All suits have the same value. &nbsp;The following chart indicates the point values of each card: </p>

                        <table className="two">
                            <thead>
                                <tr>
                                    <td>Card</td>
                                    <td>Point Value</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>2</p>
                                    </td>
                                    <td>
                                        <p>2</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>3</p>
                                    </td>
                                    <td>
                                        <p>3</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>4</p>
                                    </td>
                                    <td>
                                        <p>4</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>5</p>
                                    </td>
                                    <td>
                                        <p>5</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>6</p>
                                    </td>
                                    <td>
                                        <p>6</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>7</p>
                                    </td>
                                    <td>
                                        <p>7</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>8</p>
                                    </td>
                                    <td>
                                        <p>8</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>9</p>
                                    </td>
                                    <td>
                                        <p>9</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>10</p>
                                    </td>
                                    <td>
                                        <p>0</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Jack</p>
                                    </td>
                                    <td>
                                        <p>0</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Queen</p>
                                    </td>
                                    <td>
                                        <p>0</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>King</p>
                                    </td>
                                    <td>
                                        <p>0</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Ace</p>
                                    </td>
                                    <td>
                                        <p>1</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>3rd Card Determination</h2>
                        <p>Initial (two card) hand values determine whether a 3rd card is drawn for either or both the Player and Banker hands:<br/><br/>
                        If either the Player or Banker have 8 or 9 points (referred to as a "natural"), no additional cards are drawn for either hand.<br/>
                        If the Player's total is 6 or 7 points, the Player stands, and Banker acts as follows:<br/><br/>
                        If the Banker hand total is 5 or less, then the Banker hand will draw a third card.<br/>
                         If the Banker hand total is 6 or 7 points, the Banker will stand.<br/>
                      If the Player's total is 5 or less, then the Player hand will draw one additional card. Banker hand draws or stands depending on the value of the newly drawn Player card, as indicated in the following table:</p>
                        
                        <table>
                            <tbody>
                                <tr>
                                    <td class="c90" colspan="1" rowspan="1">
                                        <p class="c18 c45 c22 c52"></p>
                                    </td>
                                    <td class="c68" colspan="11" rowspan="1">
                                        <p class="r0">PLAYER’S THIRD CARD VALUE</p>
                                    </td>
                                </tr>
                                <tr class="c62">
                                    <td class="c90" colspan="1" rowspan="11">
                                        <div class="r90">BANKER’S&nbsp;HAND&nbsp;VALUE</div>
                                    </td>
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c8"></p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">0</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">1</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">2</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">3</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">4</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">5</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">6</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">7</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">8</p>
                                    </td>
                                    <td class="c21" colspan="1" rowspan="1">
                                        <p class="c10">9</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">9</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">8</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">7</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">6</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">5</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">4</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">3</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c14" colspan="1" rowspan="1">
                                        <p class="c10">S</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">2</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">1</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                </tr>
                                <tr class="c37">
                                    <td class="c28" colspan="1" rowspan="1">
                                        <p class="c10">0</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                    <td class="c17" colspan="1" rowspan="1">
                                        <p class="c10">D</p>
                                    </td>
                                </tr>
                                <tr class="c66">
                                    <td class="c69" colspan="12" rowspan="1">
                                        <p class="c10">
                                            <span class="c13 c61">&nbsp;D </span>: Draw 1 additional card for Banker
                                        </p>
                                       
                                        <p class="c10">
                                            <span class="c13 c70">&nbsp;S </span>: Stand / no additional card for Banker{" "}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>Sequence of Play</h2>
                            <p>Bettor places any desired wagers. Wagers are valid for a single round of play only.</p>
                            <p>Cards are dealt from 8 deck shoe (reshuffled before each round) in the following order:</p>
                        
                            <ul>
    <li>1st&nbsp;card to Player</li>
    <li>1st&nbsp;card to Banker</li>
    <li>2nd&nbsp;card to Player</li>
                                <li>2nd&nbsp;card to Banker</li>
                                <li>Possible 3rd&nbsp;card to Player</li>
                                <li>Possible 3rd&nbsp;card to Banker</li>
                            </ul>
                            <h2>Additional Wagers</h2>

<p>Bettors can choose from any of the additional wagers listed below:</p>
<ul>
    <li><span class="c13">Tie</span>: Wins when the Player hand value and Banker hand value are the same.</li>
<li><span class="c13">Pair [Player / Banker]</span>: Separate bets for Player / Banker. Wins when the first two cards of the chosen side’s hand are of the same rank. The Pair bet is for the first two cards only and does not win when the 3rd card pairs.</li>
<li><span class="c13">Either Pair</span>: Wins if the first two cards of either Player or Bank hand are of the same rank. The Either Pair bet is for the first two cards only and does not win when the 3rd card pairs.</li>
<li><span class="c13">3 Card Win [Player / Banker]</span>: Separate bets for Player / Banker. Wins if the chosen side wins with a 3 card hand.</li>
<li><span class="c13">Perfect Pairs</span>: Wins if first two cards of the Player or Banker hand are identical in both rank and suit (e.g., both Jack of Clubs). Pairs involving a 3rd card do not win this bet. Increased payout if both the Player and Banker hands are Perfect Pairs.</li>
</ul>
                        <h2>Paytable</h2>
                     
                        <table className="two">
                            <thead>
                                <tr>
                                    <td>
                                        <p>Bet Type</p>
                                    </td>
                                    <td class="c55 c29" colspan="1" rowspan="1">
                                        <p>Pays</p>
                                    </td>
                                   
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td >
                                        <p>Player Win</p>
                                    </td>
                                    <td>
                                        <p>1:1 (even money)</p>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td >
                                        <p>Banker Win</p>
                                    </td>
                                    <td>
                                        <p>0.95:1</p>
                                    </td>
                                   
                                </tr>
                                <tr>
                                    <td >
                                        <p>Tie</p>
                                    </td>
                                    <td>
                                        <p>8:1</p>
                                    </td>
                                   
                                </tr>
                                <tr>
                                    <td >
                                        <p>Player Pair</p>
                                    </td>
                                    <td>
                                        <p>11:1</p>
                                    </td>
                                  
                                </tr>
                                <tr>
                                    <td >
                                        <p>Banker Pair</p>
                                    </td>
                                    <td>
                                        <p>11:1</p>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td >
                                        <p>Either Pair</p>
                                    </td>
                                    <td>
                                        <p>5:1</p>
                                    </td>
                                  
                                </tr>
                                <tr>
                                    <td >
                                        <p>Perfect Pair</p>
                                    </td>
                                    <td>
                                        <p>Both: 200:1; Either: 25:1</p>
                                    </td>
                                   
                                </tr>
                                <tr>
                                    <td >
                                        <p>3 Card Win - Player</p>
                                    </td>
                                    <td>
                                        <p>4:1</p>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td >
                                        <p>3 Card Win - Banker</p>
                                    </td>
                                    <td>
                                        <p>5:1</p>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                    </article>
                </ModalContent>
            </Modal>
            <div id="balance-bet-box" style={{ top: 40, right: -33 }}>
                <div className="balance-bet">
                    Total Bets
                    <div id="total-bet" className="counter" data-count={prop.totalBetAll}></div>
                </div>
                <div className="balance-bet">
                    Total Wins
                    <div id="total-bet" className="counter" data-count={prop.totalWinAll}></div>
                </div>
            </div>
        </span>
    );
};

export default ModalExampleScrollingContent;
