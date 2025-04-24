import tauri from '../src-tauri/icons/Square107x107Logo.png'
import tauri2 from '../src-tauri/icons/Square150x150Logo.png'
import tauri3 from '../src-tauri/icons/Square44x44Logo.png'
import tauri4 from '../src-tauri/icons/Square142x142Logo.png' 
import tauri5 from '../src-tauri/icons/Square284x284Logo.png'
import tauri6 from '../src-tauri/icons//Square30x30Logo.png'
import tauri7 from '../src-tauri/icons/Square71x71Logo.png'
import tauri8 from '../src-tauri/icons/Square89x89Logo.png'
import tauri9 from '../src-tauri/icons/32x32.png'
import tauri10 from '../src-tauri/icons/128x128.png'
import tauri11 from '../src-tauri/icons/128x128@2x.png' /*feil*/

export default function Test() {
    return (
        <div>
            <img src={tauri} alt="" />
            <img src={tauri2} alt="" />
            <img src={tauri3} alt="" />
            <img src={tauri4} alt="" />
            <img src={tauri5} alt="" />
            <img src={tauri6} alt="" /> 
            <img src={tauri7} alt="" />
            <img src={tauri8} alt="" />
            <img src={tauri9} alt="" />
            <img src={tauri10} alt="" />
            <img src={tauri11} alt="" />

            <br />
            <br />
            <img src={tauri5}/*284x284 */ alt="" />
            <img src={tauri2}/*150x150 */ alt="" />
            <img src={tauri4}/*142x142 */ alt="" />
            <img src={tauri10}/*128x128 */ alt="" />
            <img src={tauri}/*107x107 */ alt="" />
            <img src={tauri8}/*89x89 */ alt="" />
            <img src={tauri7}/*71x71 */ alt="" />
            <img src={tauri3}/*44x44 */ alt="" />
            <img src={tauri9}/*32x32 */ alt="" />
            <img src={tauri6}/*30x30 */ alt="" />
        </div>

    )
}