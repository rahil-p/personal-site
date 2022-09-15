import { createContext, useContext, useReducer } from 'react';

export enum ProjectsGroup {
	PRODUCT,
	FEATURED,
	CONTRIBUTIONS,
}

type FocusedState =
	| {
			group: ProjectsGroup;
			card: true | string;
	  }
	| { group: null; card: null };

type FocusedStateAction =
	| null
	| { type: 'group'; value: ProjectsGroup }
	| { type: 'card'; value: { group: ProjectsGroup; card: string } };

function focusedStateReducer(_state: FocusedState, action: FocusedStateAction): FocusedState {
	if (action === null) {
		return { group: null, card: null };
	}

	if (action.type === 'group') {
		return { group: action.value, card: true };
	}

	return { group: action.value.group, card: action.value.card };
}

export const useProjectsDispatch = () => {
	const [focusedState, dispatchFocusedState] = useReducer(focusedStateReducer, {
		group: null,
		card: null,
	});

	return {
		focusedState,
		dispatchFocusedState,
		isGroupFocused(this: void, group: ProjectsGroup) {
			return focusedState.group === group;
		},
		isGroupDimmed(this: void, group: ProjectsGroup) {
			return focusedState.group !== null && focusedState.group !== group;
		},
		isProjectFocused(this: void, group: ProjectsGroup, card: string) {
			return focusedState.group === group && (focusedState.card === true || focusedState.card === card);
		},
		isProjectDimmed(this: void, group: ProjectsGroup, card: string) {
			return (
				focusedState.group !== null &&
				(focusedState.group !== group || (focusedState.card !== true && focusedState.card !== card))
			);
		},
	};
};

export type ProjectsDispatch = ReturnType<typeof useProjectsDispatch>;

export const ProjectsContext = createContext<ProjectsDispatch>(null as unknown as ProjectsDispatch);

export const useProjects = () => {
	const context = useContext(ProjectsContext);
	return context;
};
