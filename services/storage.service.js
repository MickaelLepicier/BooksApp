import { utilService } from './util.service.js'

// export const storageService = {
//  loadFromStorage,
//  saveToStorage,
//   query,
//   get,
//   post,
//   put,
//   remove
// }

export function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

export function query(entityType, delay = 200) {
  let entities = JSON.parse(localStorage.getItem(entityType)) || []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

export function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity.id === entityId)
    if (!entity) {
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    }
    return entity
  })
}

export function post(entityType, newEntity) {
  newEntity = { ...newEntity }
  newEntity.id = utilService.makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    saveToStorage(entityType, entities)
    return newEntity
  })
}

export function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1, updatedEntity)
    saveToStorage(entityType, entities)
    return updatedEntity
  })
}
export function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId)
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1)
    saveToStorage(entityType, entities)
  })
}
