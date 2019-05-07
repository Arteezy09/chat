export default {
    state: {
        process: false,
        error: null,  
        error1: null, 
        error2: null,
        error3: null, 
        error4: null,
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
        SET_ERROR1(state, payload) {
            state.error1 = payload
        },
        CLEAR_ERROR1(state) {
            state.error1 = null
        },
        SET_ERROR2(state, payload) {
            state.error2 = payload
        },
        CLEAR_ERROR2(state) {
            state.error2 = null
        },
        SET_ERROR3(state, payload) {
            state.error3 = payload
        },
        CLEAR_ERROR3(state) {
            state.error3 = null
        },
        SET_ERROR4(state, payload) {
            state.error4 = payload
        },
        CLEAR_ERROR4(state) {
            state.error4 = null
        }
    },
    getters: {
        getProcess: (state) => state.process,
        getError: (state) => state.error,
        getError1: (state) => state.error1,
        getError2: (state) => state.error2,
        getError3: (state) => state.error3,
        getError4: (state) => state.error4    
    }
}