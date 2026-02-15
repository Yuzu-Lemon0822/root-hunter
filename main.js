import { main } from "./main/game.js"

function loop() {
  requestAnimationFrame(loop);
  main()
}
loop();