import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBoard, updateBoard, removeBoard } from '../store/board/board.action'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'

export const SeedDemo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedinUser = useSelector(state => state.userModule.loggedinUser)

  useEffect(() => {
    const seed = async () => {
      // Build identity: logged-in or persistent guest
      let user = loggedinUser
      if (!user) {
        let guestId = localStorage.getItem('guestUserId')
        if (!guestId) {
          guestId = utilService.makeId()
          localStorage.setItem('guestUserId', guestId)
        }
        user = { _id: guestId, fullname: 'Guest', imgUrl: 'profile-img-guest' }
      }

      // Demo members
      const members = [
        user,
        { _id: 'u_tal', fullname: 'Tal', imgUrl: 'profile-img-tal' },
        { _id: 'u_michael', fullname: 'Michael', imgUrl: 'profile-img-michael' },
        { _id: 'u_or', fullname: 'Or', imgUrl: 'profile-img-or' },
        { _id: 'u_gal', fullname: 'Gal', imgUrl: 'profile-img-gal' }
      ]

      const now = Date.now()
      const day = 1000 * 60 * 60 * 24

      // Helpers for richer demo content
      const memberById = (id) => members.find(m => m._id === id) || members[0]
      const makeComment = ({ by, txt, offset = 0, likes = [] }) => ({
        id: utilService.makeId(),
        txt,
        createdAt: now - offset * day,
        byMember: memberById(by),
        likes: likes.map(uid => {
          const m = memberById(uid)
          return { fullname: m.fullname, imgUrl: m.imgUrl, id: m._id }
        })
      })

      const makeTask = ({ title, status, priority, members: mids, startOffset = 0, endOffset = 2, comments = [] }) => ({
        id: utilService.makeId(),
        title,
        status,
        priority,
        memberIds: mids,
        timeline: { startDate: now - startOffset * day, endDate: now + endOffset * day },
        comments
      })

      const makeGroup = ({ title, style, tasks }) => ({ id: utilService.makeId(), title, tasks, style })

      const boards = [
        {
          title: 'Website Launch',
          createdBy: { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl },
          members,
          cmpsOrder: ['member', 'status', 'priority', 'attachments', 'timeline'],
          groups: [
            makeGroup({
              title: 'Backlog', style: 'clr5', tasks: [
                makeTask({
                  title: 'Define MVP scope',
                  status: 'Working on it',
                  priority: 'High',
                  members: [user._id, 'u_tal'],
                  startOffset: 7,
                  endOffset: 7,
                  comments: [
                    makeComment({ by: 'u_tal', txt: 'Drafted the initial MVP checklist.', offset: 6, likes: [user._id] }),
                    makeComment({ by: user._id, txt: 'Looks good. Let’s confirm with the team tomorrow.', offset: 5 })
                  ]
                }),
                makeTask({
                  title: 'Wireframes for homepage',
                  status: 'Done',
                  priority: 'Medium',
                  members: ['u_michael'],
                  startOffset: 10,
                  endOffset: -1,
                  comments: [
                    makeComment({ by: 'u_michael', txt: 'Uploaded wireframes to Drive for review.', offset: 9, likes: ['u_gal'] })
                  ]
                }),
                makeTask({
                  title: 'Set up hosting',
                  status: 'Pending',
                  priority: 'Medium',
                  members: [user._id],
                  startOffset: 1,
                  endOffset: 5,
                  comments: [
                    makeComment({ by: user._id, txt: 'Comparing providers. Leaning toward Vercel for the FE and Render for the API.', offset: 1 })
                  ]
                })
              ]
            }),
            makeGroup({
              title: 'Development', style: 'clr8', tasks: [
                makeTask({
                  title: 'Implement auth flow',
                  status: 'Working on it',
                  priority: 'Critical',
                  members: ['u_or', 'u_gal'],
                  startOffset: 3,
                  endOffset: 9,
                  comments: [
                    makeComment({ by: 'u_or', txt: 'JWT implemented, finishing refresh token rotation.', offset: 2, likes: ['u_gal'] }),
                    makeComment({ by: 'u_gal', txt: 'UI wiring next. Need copy for error states.', offset: 1 })
                  ]
                }),
                makeTask({
                  title: 'Responsive navbar',
                  status: 'Stuck',
                  priority: 'High',
                  members: ['u_tal'],
                  startOffset: 2,
                  endOffset: 6,
                  comments: [
                    makeComment({ by: 'u_tal', txt: 'Edge case on mobile landscape. Need new breakpoint.', offset: 1 })
                  ]
                })
              ]
            }),
            makeGroup({
              title: 'QA', style: 'clr11', tasks: [
                makeTask({
                  title: 'Regression checklist',
                  status: 'Waiting for QA',
                  priority: 'Low',
                  members: ['u_michael'],
                  startOffset: 0,
                  endOffset: 3,
                  comments: [
                    makeComment({ by: 'u_michael', txt: 'Drafted the checklist. Waiting for FE to stabilize.', offset: 0 })
                  ]
                })
              ]
            })
          ]
        },
        {
          title: 'Marketing Plan',
          createdBy: { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl },
          members,
          cmpsOrder: ['member', 'status', 'priority', 'attachments', 'timeline'],
          groups: [
            makeGroup({
              title: 'Ideas', style: 'clr9', tasks: [
                makeTask({
                  title: 'Landing page hero A/B',
                  status: 'Working on it',
                  priority: 'High',
                  members: ['u_tal'],
                  startOffset: 1,
                  endOffset: 4,
                  comments: [
                    makeComment({ by: 'u_tal', txt: 'Variant B wins on CTR by 12%.', offset: 1, likes: ['u_michael'] })
                  ]
                }),
                makeTask({
                  title: 'Blog topics list',
                  status: 'Pending',
                  priority: 'Medium',
                  members: [user._id],
                  startOffset: 0,
                  endOffset: 7,
                  comments: [
                    makeComment({ by: user._id, txt: 'Collecting ideas around productivity and PM tips.', offset: 0 })
                  ]
                })
              ]
            }),
            makeGroup({
              title: 'In progress', style: 'clr10', tasks: [
                makeTask({
                  title: 'Launch teaser on socials',
                  status: 'Need help',
                  priority: 'Medium',
                  members: ['u_gal'],
                  startOffset: 2,
                  endOffset: 2,
                  comments: [
                    makeComment({ by: 'u_gal', txt: 'Need final brand assets for the teaser.', offset: 2, likes: [user._id] })
                  ]
                })
              ]
            }),
            makeGroup({
              title: 'Completed', style: 'clr12', tasks: [
                makeTask({
                  title: 'Brand guidelines',
                  status: 'Done',
                  priority: 'Low',
                  members: ['u_michael'],
                  startOffset: 20,
                  endOffset: -5,
                  comments: [
                    makeComment({ by: 'u_michael', txt: 'Guidelines finalized. Uploaded the PDF.', offset: 10 })
                  ]
                })
              ]
            })
          ]
        },
        {
          title: 'Sprint Backlog',
          createdBy: { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl },
          members,
          cmpsOrder: ['member', 'status', 'priority', 'attachments', 'timeline'],
          groups: [
            makeGroup({
              title: 'Sprint 34', style: 'clr3', tasks: [
                makeTask({
                  title: 'Bugfix: board filters',
                  status: 'Working on it',
                  priority: 'High',
                  members: ['u_or'],
                  startOffset: 1,
                  endOffset: 3,
                  comments: [
                    makeComment({ by: 'u_or', txt: 'Reproduced on Safari; fixing comparator.', offset: 1 })
                  ]
                }),
                makeTask({
                  title: 'Improve performance',
                  status: 'Waiting for QA',
                  priority: 'Medium',
                  members: ['u_michael', 'u_gal'],
                  startOffset: 4,
                  endOffset: 10,
                  comments: [
                    makeComment({ by: 'u_gal', txt: 'Virtualized the table rows; 3x faster.', offset: 3, likes: ['u_michael'] })
                  ]
                })
              ]
            }),
            makeGroup({
              title: 'Sprint 35', style: 'clr4', tasks: [
                makeTask({
                  title: 'Notifications center',
                  status: 'Pending',
                  priority: 'Low',
                  members: [user._id],
                  startOffset: 0,
                  endOffset: 12,
                  comments: [
                    makeComment({ by: user._id, txt: 'Drafted UX for inbox and toasts.', offset: 0 })
                  ]
                }),
                makeTask({
                  title: 'Attachments gallery',
                  status: 'Stuck',
                  priority: 'Critical',
                  members: ['u_tal'],
                  startOffset: 3,
                  endOffset: 8,
                  comments: [
                    makeComment({ by: 'u_tal', txt: 'Need backend pagination for large lists.', offset: 2 })
                  ]
                })
              ]
            })
          ]
        }
      ]

      // Optional reset: add ?reset=1 to URL to delete existing demo boards by title first
      const existing = await boardService.query()
      const reset = (() => {
        try {
          const params = new URLSearchParams(window.location.search)
          const v = params.get('reset')
          return v === '1' || v === 'true'
        } catch (_) { return false }
      })()

      if (reset) {
        const titles = boards.map(b => b.title)
        for (const ex of existing) {
          if (titles.includes(ex.title)) {
            await dispatch(removeBoard(ex._id))
          }
        }
      }

      // Upsert: update if exists by title, else create
      const afterExisting = reset ? await boardService.query() : existing
      for (const b of boards) {
        const match = afterExisting.find(x => x.title === b.title)
        if (match) {
          b._id = match._id
          await dispatch(updateBoard(b))
        } else {
          await dispatch(addBoard(b))
        }
      }

      navigate('/workspace/home')
    }

    seed()
  }, [])

  return (
    <section className="main-layout">
      <h2>Seeding demo data...</h2>
      <p>This may take a few seconds. You will be redirected automatically.</p>
    </section>
  )
}
