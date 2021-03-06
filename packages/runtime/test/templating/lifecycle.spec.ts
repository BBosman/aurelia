// import { LifecycleController, LifecycleFlags, Lifecycle, LifecycleController, Lifecycle, State } from '../../src/index';
// import { eachCartesianJoinFactory } from '../util';
// import { LifecycleMock } from '../mock';
// import { expect } from 'chai';

// function verifyAttachCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkTopDown(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`$attach`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,   `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,   `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyDetachCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkTopDownReverse(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`$detach`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,   `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,   `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyRemoveNodesCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + 1);

//   let i = 0;
//   mock.walkTopDownReverse(x => {
//     i++
//   });
//   expect(i).to.equal(count);
//   expect(mock.calls[offset + 0][0]).to.equal(`$unmount`,   `calls[${offset}+0][0]`);
//   expect(mock.calls[offset + 0][1]).to.equal(0,                `calls[${offset}+0][1]`);
//   expect(mock.calls[offset + 0][2]).to.equal(0,                `calls[${offset}+0][2]`);
// }

// function verifyDetachedCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkBottomUpReverse(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`detached`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,    `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,    `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyUnbindCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkTopDownReverse(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`$unbind`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,   `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,   `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyAddNodesCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkBottomUp(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`$mount`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,     `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,     `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyAttachedCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkBottomUp(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`attached`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,    `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,    `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyStartAsyncWorkCalls(offset: number, count: number, mock: LifecycleMock): void {
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkTopDown(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`startAsyncWork`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,          `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,          `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyCompleteAsyncWorkCalls(offset: number, count: number, mock: LifecycleMock): void {
//   count *= 2;
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkTopDown(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`completeAsyncWork`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,             `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,             `calls[${offset}+${i}][2]`);
//     i++
//     expect(mock.calls[offset + i][0]).to.equal(`finalizeAsyncWork`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,             `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,             `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// function verifyCancelAsyncWorkCalls(offset: number, count: number, mock: LifecycleMock): void {
//   count *= 2;
//   expect(mock.calls.length).to.be.gte(offset + count);

//   let i = 0;
//   mock.walkTopDown(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`cancelAsyncWork`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,           `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,           `calls[${offset}+${i}][2]`);
//     i++
//   });
//   mock.walkTopDown(x => {
//     expect(mock.calls[offset + i][0]).to.equal(`finalizeAsyncWork`, `calls[${offset}+${i}][0]`);
//     expect(mock.calls[offset + i][1]).to.equal(x.depth,             `calls[${offset}+${i}][1]`);
//     expect(mock.calls[offset + i][2]).to.equal(x.index,             `calls[${offset}+${i}][2]`);
//     i++
//   });
//   expect(i).to.equal(count);
// }

// describe(`LifecycleController `, () => {

//   eachCartesianJoinFactory<
//     [string, LifecycleFlags],
//     [string, LifecycleController],
//     [number, LifecycleMock],
//     [string, (count: number, sut: LifecycleController, mock: LifecycleMock) => Promise<void>],
//     void
//   >([
//       [
//         () => [`flags=none   `, LifecycleFlags.none               ],
//         () => [`flags=noTasks`, LifecycleFlags.noTasks            ],
//         () => [`flags=unbind `, LifecycleFlags.unbindAfterDetached]
//       ],
//       [
//         ([text, flags]) => [
//           `single`,
//           new LifecycleController(new Lifecycle(), flags)
//         ]
//       ],
//       [
//         ([text, flags]) => [
//            1,
//           new LifecycleMock()
//         ],
//         ([text, flags]) => [
//            6,
//           new LifecycleMock(
//             new LifecycleMock(),
//             new LifecycleMock(),
//             new LifecycleMock(),
//             new LifecycleMock(),
//             new LifecycleMock()
//           )
//         ],
//         ([text, flags]) => [
//            10,
//           new LifecycleMock(
//             new LifecycleMock(
//               new LifecycleMock(
//                 new LifecycleMock(
//                   new LifecycleMock(
//                     new LifecycleMock()
//                   )
//                 )
//               ),
//               new LifecycleMock(
//                 new LifecycleMock(
//                   new LifecycleMock(
//                     new LifecycleMock()
//                   )
//                 )
//               )
//             )
//           )
//         ],
//         ([text, flags]) => [
//            13,
//           new LifecycleMock(
//             new LifecycleMock(
//               new LifecycleMock(),
//               new LifecycleMock(),
//               new LifecycleMock()
//             ),
//             new LifecycleMock(
//               new LifecycleMock(),
//               new LifecycleMock(),
//               new LifecycleMock()
//             ),
//             new LifecycleMock(
//               new LifecycleMock(),
//               new LifecycleMock(),
//               new LifecycleMock()
//             )
//           )
//         ]
//       ],
//       [
//         ($1) => [
//           `attach                           -> end`,
//           async (count, sut, mock) => {
//             sut.attach(mock);

//             verifyAttachCalls(0, count, mock);

//             const task = sut.end();

//             expect(task).to.equal(this.lifecycle.done);
//             verifyAddNodesCalls(count, count, mock);
//             verifyAttachedCalls(count * 2, count, mock);
//           }
//         ],
//         ($1) => [
//           `attach -> registerTask           -> end`,
//           async (count, sut, mock) => {
//             sut.attach(mock);

//             verifyAttachCalls(0, count, mock);

//             mock.registerTo(sut);

//             verifyStartAsyncWorkCalls(count, count, mock);

//             const task = sut.end();

//             expect(task).not.to.equal(this.lifecycle.done);
//             expect(task.done).to.equal(false);
//             expect(task.canCancel()).to.equal(true);

//             expect(mock.calls.length).to.equal(count * 2);

//             await task.wait();

//             expect(task.done).to.equal(true);
//             expect(task.canCancel()).to.equal(false);

//             verifyCompleteAsyncWorkCalls(count * 2, count, mock);
//             verifyAddNodesCalls(count * 4, count, mock);
//             verifyAttachedCalls(count * 5, count, mock);
//           }
//         ],
//         ($1) => [
//           `attach -> registerTask -> cancel -> end`,
//           async (count, sut, mock) => {
//             sut.attach(mock);

//             verifyAttachCalls(0, count, mock);

//             mock.registerTo(sut);

//             verifyStartAsyncWorkCalls(count, count, mock);

//             const task = sut.end();

//             expect(task).not.to.equal(this.lifecycle.done);
//             expect(task.done).to.equal(false);
//             expect(task.canCancel()).to.equal(true);

//             expect(mock.calls.length).to.equal(count * 2);

//             task.cancel();
//             await task.wait();

//             expect(task.done).to.equal(true);
//             expect(task.canCancel()).to.equal(false);

//             verifyCancelAsyncWorkCalls(count * 2, count, mock);
//             verifyAddNodesCalls(count * 4, count, mock);
//             verifyAttachedCalls(count * 5, count, mock);
//           }
//         ]
//       ]
//     ], ([t1, flags], [t2, sut], [count, mock], [t3, exec3]) => {
//       it(`${t1} ctrl=${t2} mockCount=${count<10?' ':''}${count} -> ${t2}`, async () => {
//         await exec3(count, sut, mock);
//       });
//     }
//   );
// });

// describe(`LifecycleController `, () => {

//   eachCartesianJoinFactory<
//     [string, LifecycleFlags],
//     [string, LifecycleController],
//     [number, LifecycleMock],
//     [string, (count: number, sut: LifecycleController, mock: LifecycleMock) => void],
//     [string, (count: number, sut: LifecycleController, mock: LifecycleMock) => Promise<void>],
//     void
//   >([
//       [
//         () => [`flags=none   `, LifecycleFlags.none               ],
//         () => [`flags=noTasks`, LifecycleFlags.noTasks            ],
//         () => [`flags=unbind `, LifecycleFlags.unbindAfterDetached]
//       ],
//       [
//         ([text, flags]) => [
//           `single`,
//           new LifecycleController(new Lifecycle(), flags)
//         ]
//       ],
//       [
//         ([text, flags]) => [
//            1,
//           new LifecycleMock()
//         ],
//         ([text, flags]) => [
//            6,
//           new LifecycleMock(
//             new LifecycleMock(),
//             new LifecycleMock(),
//             new LifecycleMock(),
//             new LifecycleMock(),
//             new LifecycleMock()
//           )
//         ],
//         ([text, flags]) => [
//            10,
//           new LifecycleMock(
//             new LifecycleMock(
//               new LifecycleMock(
//                 new LifecycleMock(
//                   new LifecycleMock(
//                     new LifecycleMock()
//                   )
//                 )
//               ),
//               new LifecycleMock(
//                 new LifecycleMock(
//                   new LifecycleMock(
//                     new LifecycleMock()
//                   )
//                 )
//               )
//             )
//           )
//         ],
//         ([text, flags]) => [
//            13,
//           new LifecycleMock(
//             new LifecycleMock(
//               new LifecycleMock(),
//               new LifecycleMock(),
//               new LifecycleMock()
//             ),
//             new LifecycleMock(
//               new LifecycleMock(),
//               new LifecycleMock(),
//               new LifecycleMock()
//             ),
//             new LifecycleMock(
//               new LifecycleMock(),
//               new LifecycleMock(),
//               new LifecycleMock()
//             )
//           )
//         ]
//       ],
//       [
//         ($1) => [
//           `$isAttached=true`,
//           (count, sut, mock) => {
//             mock.walkTopDown(x => {
//               x.$state |= State.isAttached;
//             });
//           }
//         ]
//       ],
//       [
//         ($1, $2) => [
//           `detach                           -> end`,
//           async (count, sut, mock) => {
//             sut.detach(mock);

//             verifyDetachCalls(0, count, mock);

//             const task = sut.end();

//             expect(task).to.equal(this.lifecycle.done);

//             verifyRemoveNodesCalls(count, count, mock);

//             // Note: the commented-out assertions are for when the "only remove root nodes" behavior is disabled
//             // we're leaving them in here just in case we need to test with that optimization disabled again
//             // This can of course be removed once everything has stabilized and we're ready for releasing
//             // verifyDetachedCalls(count * 2, count, mock);

//             // if (sut.flags === LifecycleFlags.unbindAfterDetached) {
//             //   verifyUnbindCalls(count * 3, count, mock);
//             // }
//             // the commented-out assertion further below should replace the assertion directly below
//             verifyDetachedCalls(count + 1, count, mock);

//             if (sut.flags === LifecycleFlags.unbindAfterDetached) {
//               verifyUnbindCalls(count * 2 + 1, count, mock);
//             }
//           }
//         ],
//         ($1, $2) => [
//           `detach -> registerTask           -> end`,
//           async (count, sut, mock) => {
//             sut.detach(mock);

//             verifyDetachCalls(0, count, mock);

//             mock.registerTo(sut);

//             verifyStartAsyncWorkCalls(count, count, mock);

//             const task = sut.end();

//             expect(task).not.to.equal(this.lifecycle.done);
//             expect(task.done).to.equal(false);
//             expect(task.canCancel()).to.equal(true);

//             expect(mock.calls.length).to.equal(count * 2);

//             await task.wait();

//             expect(task.done).to.equal(true);
//             expect(task.canCancel()).to.equal(false);

//             verifyCompleteAsyncWorkCalls(count * 2, count, mock);
//             verifyRemoveNodesCalls(count * 4, count, mock);

//             // Note: the commented-out assertions are for when the "only remove root nodes" behavior is disabled
//             // we're leaving them in here just in case we need to test with that optimization disabled again
//             // This can of course be removed once everything has stabilized and we're ready for releasing
//             // verifyDetachedCalls(count * 5, count, mock);

//             // if (sut.flags === LifecycleFlags.unbindAfterDetached) {
//             //   verifyUnbindCalls(count * 6, count, mock);
//             // }

//             verifyDetachedCalls(count * 4 + 1, count, mock);

//             if (sut.flags === LifecycleFlags.unbindAfterDetached) {
//               verifyUnbindCalls(count * 5 + 1, count, mock);
//             }
//           }
//         ],
//         ($1, $2) => [
//           `detach -> registerTask -> cancel -> end`,
//           async (count, sut, mock) => {
//             sut.detach(mock);

//             verifyDetachCalls(0, count, mock);

//             mock.registerTo(sut);

//             verifyStartAsyncWorkCalls(count, count, mock);

//             const task = sut.end();

//             expect(task).not.to.equal(this.lifecycle.done);
//             expect(task.done).to.equal(false);
//             expect(task.canCancel()).to.equal(true);

//             expect(mock.calls.length).to.equal(count * 2);

//             task.cancel();
//             await task.wait();

//             expect(task.done).to.equal(true);
//             expect(task.canCancel()).to.equal(false);

//             verifyCancelAsyncWorkCalls(count * 2, count, mock);
//             verifyRemoveNodesCalls(count * 4, count, mock);

//             // Note: the commented-out assertions are for when the "only remove root nodes" behavior is disabled
//             // we're leaving them in here just in case we need to test with that optimization disabled again
//             // This can of course be removed once everything has stabilized and we're ready for releasing
//             // verifyDetachedCalls(count * 5, count, mock);

//             // if (sut.flags === LifecycleFlags.unbindAfterDetached) {
//             //   verifyUnbindCalls(count * 6, count, mock);
//             // }
//             verifyDetachedCalls(count * 4 + 1, count, mock);

//             if (sut.flags === LifecycleFlags.unbindAfterDetached) {
//               verifyUnbindCalls(count * 5 + 1, count, mock);
//             }
//           }
//         ]
//       ]
//     ], ([t1, flags], [t2, sut], [count, mock], [t3, exec3], [t4, exec4]) => {
//       it(`${t1} ctrl=${t2} mockCount=${count<10?' ':''}${count} -> ${t3} -> ${t4}`, async () => {
//         exec3(count, sut, mock);
//         await exec4(count, sut, mock);
//       });
//     }
//   );
// });
