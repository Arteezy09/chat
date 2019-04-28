export default {
    state: {
        process: false,
        error: null
  
    },
    mutations: {
        SET_PROCESS(state, payload) {
            state.process = payload
        },
        SET_ERROR(state, payload) {
            state.error = payload
        },
        CLEAR_ERROR(state) {
            state.error = null
        },
  
    },
    actions: {
  
    },
    getters: {
        getProcess: (state) => state.process,
        getError: (state) => state.error
    }
}