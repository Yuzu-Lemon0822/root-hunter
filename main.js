import { main } from "./game.js"

function loop() {
  requestAnimationFrame(loop);
  main()
}
loop();