class IndexedDBService {
    private db?: IDBDatabase;

    constructor () {
      this.db = undefined
    }
    async loadDb () {
      return new Promise((resolve, reject) => {
        if (this.db) {
          resolve(this.db)
        }
        let request = window.indexedDB.open('jeh-maker', 1)

        request.onerror = (e) => {
          // eslint-disable-next-line no-console
          console.log('Error opening db', e)
          reject(new Error('Error'))
        }

        request.onsuccess = (e) => {
          this.db = (<IDBOpenDBRequest>e.target).result
          resolve(this.db)
        }

        request.onupgradeneeded = (e) => {
          const db = (<IDBOpenDBRequest>e.target).result
          db.createObjectStore('projects', {
            autoIncrement: true,
            keyPath: 'id'
          })
        }
      })
    }

    async getAllProjects () : Promise<any[]> {
      return new Promise(async (resolve, reject) => {
        if (!this.db) {
          return
        }

        const tx = this.db.transaction(['projects'], 'readonly')
        const store = tx.objectStore('projects')
        const request = store.getAll()

        request.onsuccess = (e) => {
          resolve((<IDBRequest>e.target).result)
        }
      })
    }

    async addProject (project) {
      return new Promise((resolve, reject) => {
        if (!this.db) {
          return
        }
        let transaction = this.db.transaction(['projects'], 'readwrite')
        let store = transaction.objectStore('projects')
        project.createdAt = new Date()
        project.updatedAt = new Date()
        let request = store.add(project)

        request.onerror = (e) => {
          // eslint-disable-next-line no-console
          console.log('Error adding project', e)
          reject(new Error('Error'))
        }

        request.onsuccess = (e) => {
          resolve((<IDBRequest>e.target).result)
        }
      })
    }
    async deleteProject (project) {
      return new Promise((resolve, reject) => {
        if (!this.db) {
          return
        }
        let transaction = this.db.transaction(['projects'], 'readwrite')
        let store = transaction.objectStore('projects')
        let request = store.delete(project.id)

        request.onerror = (e) => {
          // eslint-disable-next-line no-console
          console.log('Error deleting project', e)
          reject(new Error('Error'))
        }

        request.onsuccess = (e) => {
          resolve((<IDBRequest>e.target).result)
        }
      })
    }
    async updateProject (project) {
      return new Promise((resolve, reject) => {
        if (!this.db) {
          return
        }
        let transaction = this.db.transaction(['projects'], 'readwrite')
        let store = transaction.objectStore('projects')
        project.updatedAt = new Date()
        let request = store.put(project)

        request.onerror = (e) => {
          // eslint-disable-next-line no-console
          console.log('Error updating project', e)
          reject(new Error('Error'))
        }

        request.onsuccess = (e) => {
          resolve((<IDBRequest>e.target).result)
        }
      })
    }
}

export default new IndexedDBService()
