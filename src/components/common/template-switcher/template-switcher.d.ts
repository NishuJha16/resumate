declare const TemplateSwitcher: ({ updateCurrentTemplate, currentTemplate, }: {
    updateCurrentTemplate: (val: string) => void;
    currentTemplate: string;
    data: any;
    steps: number[];
}) => import("react/jsx-runtime").JSX.Element;
export default TemplateSwitcher;
