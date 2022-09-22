import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { loadTask, openModal, updateTask } from "../store/board/board.action"
import { ReactComponent as Like } from '../assets/icons/like.svg'
import { ReactComponent as Reply } from '../assets/icons/reply.svg'
import { ReactComponent as Clock } from '../assets/icons/clock.svg'
import { ReactComponent as Menu } from '../assets/icons/board-menu.svg'
import { TaskDetailPersonMenu } from "./task-detail-person-menu"
import { GrClose } from 'react-icons/gr'
import moment from "moment"
import { utilService } from "../services/util.service"
import { useRef } from "react"
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";

export const TaskDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const task = useSelector(state => state.boardModule.task)
    const board = useSelector(state => state.boardModule.board)
    const itemId = useSelector(state => state.boardModule.modals.itemId)
    const isTaskDetailPersonMenuOpen = useSelector(state => state.boardModule.modals.isTaskDetailPersonMenuOpen)
    const [whichRenders, setWhichRenders] = useState('isUpdates')
    const params = useParams()
    const [searchParams] = useSearchParams()
    const groupId = searchParams.get('groupId')
    const taskId = searchParams.get('taskId')
    const boardId = params.boardId

    useEffect(() => {
        dispatch(loadTask(taskId ))
    }, [])

    const closeTaskDetail = () => {
        navigate(`/workspace/board/${boardId}`)
    }


    const onSetTaskPersonMenuOpen = () => {
        dispatch(openModal('isTaskDetailPersonMenuOpen', taskId))
    }

    if (!task) return
    return <section className='task-detail'>
        <button className="btn btn-svg btn-svg-x" onClick={() => closeTaskDetail()}><GrClose /></button>
        <div className='task-detail-header'>
            <div className='task-detail-header-top'>
                <h3>{task.title}</h3>
                <div className='task-detail-member-container'>
                    <button className="btn btn-add-developer" onClick={() => onSetTaskPersonMenuOpen()}>+</button>
                    {task.memberIds && task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))}
                </div>
            </div>
            <div className='task-detail-header-bottom'>
                <button onClick={() => setWhichRenders('isUpdates')}><span>Updates</span></button>
                <button onClick={() => setWhichRenders('isFiles')}><span>Files</span></button>
                <button onClick={() => setWhichRenders('isActivity')}><span>Activity Log</span></button>
            </div>
        </div>
        {(whichRenders === 'isUpdates' && task) && <TaskDetailUpdates task={task} groupId={groupId} board={board} />}
        {whichRenders === 'isFiles' && <TaskDetailFiles />}
        {whichRenders === 'isActivity' && <TaskDetailActivity />}
    </section>
}


const TaskDetailUpdates = ({ task, groupId, board }) => {
    const [isChatOpen, setIsChatOpen] = useState(false)
    return <section className='task-detail-updates'>
        {!isChatOpen && <button className='chat-box-closed' onClick={() => setIsChatOpen(true)}><span>Write an update...</span></button>}
        {isChatOpen && <ChatBox setIsChatOpen={setIsChatOpen} task={task} groupId={groupId} board={board} />}
        {task.comments && task.comments.map(comment =>
            <Post key={comment.id} board={board} task={task} groupId={groupId} byMember={comment.byMember} txt={comment.txt} createdAt={comment.createdAt} />
        )}
    </section>
}

const TaskDetailFiles = () => {
    return <section className='task-detail-files'>
    </section>
}

const TaskDetailActivity = () => {
    return <section className='task-detail-activity'>

    </section>
}

// {
//     "id": "c104",
//     "title": "Help me",
//     "status": "in-progress",
//     "priority": "low",
//     "description": "description",
//     "comments": [
//       {
//         "id": "ZdPnm",
//         "txt": "also @yaronb please CR this",
//         "createdAt": 1590999817436,
//         "byMember": {
//           "_id": "u101",
//           "fullname": "Tal Tarablus",
//           "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//         }

const Post = ({ board,task,groupId, byMember, txt, createdAt }) => {
    const likeRef = useRef()
    const dispatch = useDispatch()
    const getFormattedDateTime = (date) => {
        if (!date) return
        moment.updateLocale('en', {
            relativeTime: {
                s: 'now',
                ss: '%ds',
                mm: "%dm",
                hh: "%dh",
                dd: "%dd",
                ww: "%dw",
                MM: "%dm",
                yy: "%dy"
            }
        });
        return moment(date).fromNow(true)
    }
    const animateLike =(ev) => {
        likeRef.current.classList.add('wobble-ver-left')
        confetti({
            particleCount: 150,
            spread: 60,
            origin: {
                x: ev.pageX/window.innerWidth,
                y: ev.pageY/window.innerHeight,
            }
            
          });
        setTimeout(()=>{
            likeRef.current.classList.remove('wobble-ver-left')

        },1300)
        if(!task.likes) {
            // let updatedTask 
            // dispatch(updateTask({task:[...task,likes:[byMember]}))
        }
    }
    return <section className='post'>
        <div className="post-header">
            <div className='img-container'>
            <img className='profile-img-icon' src={require(`../assets/img/${byMember.imgUrl}.png`)} alt="" />
                <p className="fullname">{byMember.fullname}</p>
            </div>
            <div className="time-menu-container">
                <p><Clock />{getFormattedDateTime(createdAt)}</p>
                <button className="btn btn-svg btn-menu"><Menu /></button>
            </div>
        </div>
        <p className="comment-txt">{txt}</p>
        <div className="reply-like-container">
            <div className="like-container">
                <button onClick={(ev)=>animateLike(ev)} className="btn-svg btn-like"><Like ref={likeRef}/>Like</button>
            </div>
            <div className="reply-container">
                <button className="btn btn-svg btn-reply"><Reply />Reply</button>
            </div>
        </div>
    </section>
}
const GetMemberImgFromId = (board, memberId) => {
    const imgUrl = board.members.find(member => member._id === memberId).imgUrl
    return <img key={memberId} className='profile-img-icon' src={require(`../assets/img/${imgUrl}.png`)} alt="" />
}

const ChatBox = ({ setIsChatOpen, task, groupId, board }) => {
    
    const dispatch = useDispatch()
    const textAreaRef = useRef()
    const [newText, setNewText] = useState('')
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    const PostComment = () => {
        let updatedTask
        const comment = { id: utilService.makeId(), txt: newText, createdAt: Date.now(), byMember: { _id: loggedinUser._id, fullname: loggedinUser.fullname, imgUrl: loggedinUser.imgUrl } }
        if (!task.comments) {
            updatedTask = {...task,comments:[comment]}
            task.comments = [comment]
        }
        else {
            updatedTask = {...task,comments:[comment,...task.comments]}
            task.comments.unshift(comment)
        }
        setIsChatOpen(false)
        textAreaRef.current.value = ''
        dispatch(updateTask({ task:updatedTask, groupId, boardId: board._id }))
        console.log('task:', task)
    }

    return <section className="chat-box-open">
        <textarea autoFocus className="chat-box" ref={textAreaRef} onBlur={(ev) => !ev.target.value ? setIsChatOpen(false) : ''} onChange={(ev) => setNewText(ev.target.value)}></textarea>
        <button className="update-comment-btn" onClick={() => PostComment()}>Update</button>
    </section>
}


// function Confetti() {
//     var random = Math.random
//     , cos = Math.cos
//     , sin = Math.sin
//     , PI = Math.PI
//     , PI2 = PI * 2
//     , timer = undefined
//     , frame = undefined
//     , confetti = [];

//   var particles = 10
//     , spread = 40
//     , sizeMin = 3
//     , sizeMax = 12 - sizeMin
//     , eccentricity = 10
//     , deviation = 100
//     , dxThetaMin = -.1
//     , dxThetaMax = -dxThetaMin - dxThetaMin
//     , dyMin = .13
//     , dyMax = .18
//     , dThetaMin = .4
//     , dThetaMax = .7 - dThetaMin;

//   var colorThemes = [
//     function() {
//       return color(200 * random()|0, 200 * random()|0, 200 * random()|0);
//     }, function() {
//       var black = 200 * random()|0; return color(200, black, black);
//     }, function() {
//       var black = 200 * random()|0; return color(black, 200, black);
//     }, function() {
//       var black = 200 * random()|0; return color(black, black, 200);
//     }, function() {
//       return color(200, 100, 200 * random()|0);
//     }, function() {
//       return color(200 * random()|0, 200, 200);
//     }, function() {
//       var black = 256 * random()|0; return color(black, black, black);
//     }, function() {
//       return colorThemes[random() < .5 ? 1 : 2]();
//     }, function() {
//       return colorThemes[random() < .5 ? 3 : 5]();
//     }, function() {
//       return colorThemes[random() < .5 ? 2 : 4]();
//     }
//   ];
//   function color(r, g, b) {
//     return 'rgb(' + r + ',' + g + ',' + b + ')';
//   }

//   // Cosine interpolation
//   function interpolation(a, b, t) {
//     return (1-cos(PI*t))/2 * (b-a) + a;
//   }

//   // Create a 1D Maximal Poisson Disc over [0, 1]
//   var radius = 1/eccentricity, radius2 = radius+radius;
//   function createPoisson() {
//     // domain is the set of points which are still available to pick from
//     // D = union{ [d_i, d_i+1] | i is even }
//     var domain = [radius, 1-radius], measure = 1-radius2, spline = [0, 1];
//     while (measure) {
//       var dart = measure * random(), i, l, interval, a, b, c, d;

//       // Find where dart lies
//       for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
//         a = domwain[i], b = domain[i+1], interval = b-a;
//         if (dart < measure+interval) {
//           spline.push(dart += a-measure);
//           break;
//         }
//         measure += interval;
//       }
//       c = dart-radius, d = dart+radius;

//       // Update the domain
//       for (i = domain.length-1; i > 0; i -= 2) {
//         l = i-1, a = domain[l], b = domain[i];
//         // c---d          c---d  Do nothing
//         //   c-----d  c-----d    Move interior
//         //   c--------------d    Delete interval
//         //         c--d          Split interval
//         //       a------b
//         if (a >= c && a < d)
//           if (b > d) domain[l] = d; // Move interior (Left case)
//           else domain.splice(l, 2); // Delete interval
//         else if (a < c && b > c)
//           if (b <= d) domain[i] = c; // Move interior (Right case)
//           else domain.splice(i, 0, c, d); // Split interval
//       }

//       // Re-measure the domain
//       for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
//         measure += domain[i+1]-domain[i];
//     }

//     return spline.sort();
//   }

//   // Create the overarching container
//   var container = document.createElement('div');
//   container.style.position = 'fixed';
//   container.style.top      = '0';
//   container.style.left     = '0';
//   container.style.width    = '100%';
//   container.style.height   = '0';
//   container.style.overflow = 'visible';
//   container.style.zIndex   = '9999';

//   // Confetto constructor
//   function Confetto(theme) {
//     this.frame = 0;
//     this.outer = document.createElement('div');
//     this.inner = document.createElement('div');
//     this.outer.appendChild(this.inner);

//     var outerStyle = this.outer.style, innerStyle = this.inner.style;
//     outerStyle.position = 'absolute';
//     outerStyle.width  = (sizeMin + sizeMax * random()) + 'px';
//     outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
//     innerStyle.width  = '100%';
//     innerStyle.height = '100%';
//     innerStyle.backgroundColor = theme();

//     outerStyle.perspective = '50px';
//     outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
//     this.axis = 'rotate3D(' +
//       cos(360 * random()) + ',' +
//       cos(360 * random()) + ',0,';
//     this.theta = 360 * random();
//     this.dTheta = dThetaMin + dThetaMax * random();
//     innerStyle.transform = this.axis + this.theta + 'deg)';

//     this.x = window.innerWidth * random();
//     this.y = -deviation;
//     this.dx = sin(dxThetaMin + dxThetaMax * random());
//     this.dy = dyMin + dyMax * random();
//     outerStyle.left = this.x + 'px';
//     outerStyle.top  = this.y + 'px';

//     // Create the periodic spline
//     this.splineX = createPoisson();
//     this.splineY = [];
//     for (var i = 1, l = this.splineX.length-1; i < l; ++i)
//       this.splineY[i] = deviation * random();
//     this.splineY[0] = this.splineY[l] = deviation * random();

//     this.update = function(height, delta) {
//       this.frame += delta;
//       this.x += this.dx * delta;
//       this.y += this.dy * delta;
//       this.theta += this.dTheta * delta;

//       // Compute spline and convert to polar
//       var phi = this.frame % 7777 / 7777, i = 0, j = 1;
//       while (phi >= this.splineX[j]) i = j++;
//       var rho = interpolation(
//         this.splineY[i],
//         this.splineY[j],
//         (phi-this.splineX[i]) / (this.splineX[j]-this.splineX[i])
//       );
//       phi *= PI2;

//       outerStyle.left = this.x + rho * cos(phi) + 'px';
//       outerStyle.top  = this.y + rho * sin(phi) + 'px';
//       innerStyle.transform = this.axis + this.theta + 'deg)';
//       return this.y > height+deviation;
//     };
//   }

//   function poof() {
//     if (!frame) {
//       // Append the container
//       document.body.appendChild(container);

//       // Add confetti
//       var theme = colorThemes[0]
//         , count = 0;
//       (function addConfetto() {
//         var confetto = new Confetto(theme);
//         confetti.push(confetto);
//         container.appendChild(confetto.outer);
//         timer = setTimeout(addConfetto, spread * random());
//       })(0);

//       // Start the loop
//       var prev = undefined;
//       requestAnimationFrame(function loop(timestamp) {
//         var delta = prev ? timestamp - prev : 0;
//         prev = timestamp;
//         var height = window.innerHeight;

//         for (var i = confetti.length-1; i >= 0; --i) {
//           if (confetti[i].update(height, delta)) {
//             container.removeChild(confetti[i].outer);
//             confetti.splice(i, 1);
//           }
//         }

//         if (timer || confetti.length)
//           return frame = requestAnimationFrame(loop);

//         // Cleanup
//         document.body.removeChild(container);
//         frame = undefined;
//       });
//     }
//   }

//   poof();
// }