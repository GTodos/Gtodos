import './style/side-bar.css'
import { FileSpreadsheet, List, NotebookPen, CalendarDays, ScanEye, Goal, Archive} from 'lucide-react';
import logo from './img/GTodos_Logo.svg';
import { useState } from 'react';


export default function SideBar() {

    

    return (
        <div className="sideBar">

            <div className='logo'>
                <img src={logo} alt="GTodos Logo" />
            </div>

            <div className="sideBar-content">
                <div className="sideBar-section">
                <h1>Lists and Sheets</h1>
                <button><FileSpreadsheet className="icon"></FileSpreadsheet> Draft Sheets</button>
                <button id='todoList'><List className="icon"></List> To Do Lists</button>
                <button><NotebookPen className="icon"></NotebookPen> Notes</button>
                </div>

                <hr/>

                <div className="sideBar-section">
                <h1>Planner</h1>
                <button><CalendarDays className="icon"></CalendarDays> Calendar</button>
                <button><ScanEye className="icon"></ScanEye> Goals</button>
                </div>
                
                <hr/>

                <div className="sideBar-section">
                <h1>Tools</h1>
                <button><Goal className="icon"></Goal> Daily Focus</button>
                <button><Archive className="icon"></Archive> Archive</button>
                </div>
            </div>


            <div className='sideBar-footer'>
                <span>Username</span>
            </div>
        </div>

    )
}