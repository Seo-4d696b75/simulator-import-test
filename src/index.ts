import { activateSkill, DencoManager, init, initContext, initUser, printEvents, startAccess } from "ekimemo-access-simulator"

init().then(() => {
  console.log("init")
  const context = initContext("import-test", "seed", true)
  let reika = DencoManager.getDenco(context, "5", 80)
  let charlotte = DencoManager.getDenco(context, "6", 50, 3)
  let offense = initUser(context, "master1", [reika])
  let defense = initUser(context, "user2", [charlotte])
  offense = activateSkill(context, { ...offense, carIndex: 0 })
  let config = {
    offense: {
      carIndex: 0,
      ...offense
    },
    defense: {
      carIndex: 0,
      ...defense
    },
    station: charlotte.link[0]
  }
  const result = startAccess(context, config)
  console.log("攻撃側のタイムライン")
  printEvents(context, result.offense, true)
  console.log("守備側のタイムライン")
  printEvents(context, result.defense, true)
})