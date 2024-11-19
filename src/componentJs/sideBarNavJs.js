const createNewSideBarContext = (
    drawerActiveButtonName,
    sideBarContext,
    clickedButtonName
) => {
    const newSideBarContext = {};

    // create new sideBarContext based on which drawer context we are in and the button we clicked
    Object.keys(sideBarContext).forEach(key => {
        if (key === drawerActiveButtonName) {
            newSideBarContext[drawerActiveButtonName] = sideBarContext[key].map(
                button => {
                    if (button.buttonName === clickedButtonName) {
                        return { ...button, isActive: true };
                    }
                    return { ...button, isActive: false };
                }
            );
        } else {
            newSideBarContext[key] = sideBarContext[key];
        }
    });

    return newSideBarContext;
};

const sideBarNavJs = {
    createNewSideBarContext,
};

export default sideBarNavJs;
