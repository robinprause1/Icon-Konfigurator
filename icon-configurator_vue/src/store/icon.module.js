export const icon = {
    namespaced: true,
    state: {
        editMode: false,
        editIdx: "",
        currentStep: 0,
        icon: "",
        icons: ["home", "mood", "cancel", "settings", "favorite", "savings", "star", "bolt", "map", "terminal",
            "person", "public", "eco", "sunny", "rocket", "rainy", "cloudy", "bedtime", "cookie","psychiatry", "ent", "lunch_dining", "emoji_nature"],
        color: "#000000",
        fill: 0,
        weight: 400,
    },
    mutations: {
        reset(state) {
            state.currentStep = 0;
            state.icon = "";
            state.color = "#000000";
            state.fill = 0;
            state.weight = 400;
        },
        next(state) {
            if (state.currentStep < 3) {
                state.currentStep++;
            }
        },
        previous(state) {
            if (state.currentStep > 0) {
                state.currentStep--;
            }
        },
        setStep(state, step){
            if(step <= 3 && step >= 0){
                state.currentStep = step;
            }
        },
        setEditMode(state, editMode) {
            state.editMode = editMode;
        },
        setEditIdx(state, editIdx) {
            state.editIdx = editIdx;
        },
        setIcon(state, icon) {
            state.icon = icon;
        },
        setFill(state, fill) {
            state.fill = fill;
        },
        setWeight(state, weight) {
            state.weight = weight;
        },
        setColor(state, color) {
            state.color = color;
        },
    },
    getters: {
        //needed because $state.state.icon returns proxy object
        getFinalIcon(state) {
            return {
                "editIdx": state.editIdx,
                "icon": state.icon,
                "fill": state.fill,
                "color": state.color,
                "weight": state.weight,
            };
        }
    }
}