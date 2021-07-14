import React, { Component } from 'react';
import './Instructions.scss';

class Instructions extends Component {

    render() {
        return (
            <div className="Instructions" onClick={this.props.onClose}>
                <div className="dialog" onClick={e => { e.stopPropagation() }}>
                    <div className="content">
                    <h1>הוראות שימוש</h1>
                    <p>
                        <span>התחברות</span>
                        על מנת להתחבר למערכת
                        יש להכניס שם מלא ומספר חשבון (תקציב) וללחוץ על כפתור כניסה.
                    </p>
                    <p>
                        <span>יצירת הזמנה חדשה</span>
                    </p>
                    <ol>
                            <li>לחיצה על כפתור "הזמנה חדשה"</li>
                            <li>סימון  המנה או המנות הרצוית לאותו היום</li>
                            <li>קביעת כמות</li>
                            <li>לאחר מילוי הימים הרצויים לחיצה על "בצע הזמנה"</li>
                            <li>לאחר עיון בהזמנה לחיצה על "שליחה"</li>
                        </ol>
                    <p>
                        לאחר שליחת ההזמנה אל חדר האוכל תתקבל הודעה מהמערכת "השליחה בוצעה"
                        ותתבצע יציאה אוטומטית לדף הראשי.
                    </p>
                    <p>
                        <span>צפייה בהיסטוריית ההזמנות</span>
                        לחיצה על כפתור "ההזמנות הקודמות שלי"
                        (היסטורית ההזמנות תוצג לפי מספר החשבון שהוקלד בכניסה למערכת)
                    </p>

                    <p>
                        <span>צפייה בהודעות מחדר האוכל</span>
                        לחיצה על כפתור "הודעות מצוות חדר האוכל" תציג הודעות לחברים מחדר האוכל.                    </p>


                    <button className="close" onClick={this.props.onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instructions;
