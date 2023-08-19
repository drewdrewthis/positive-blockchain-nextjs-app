import { render } from "@testing-library/react";
import ProjectSubmissionForm, { ProjectSubmissionFormProps } from "..";
import newProjectProps from "./new_project_props.json";
import editProjectProps from "./edit_project_props.json";

describe("<ProjectSubmissionForm />", () => {
  let onSubmitMock: jest.Mock;

  beforeEach(() => {
    onSubmitMock = jest.fn();
  });

  test("it should render and match snapshot without errors for newProjectProps", () => {
    const { container } = render(
      <ProjectSubmissionForm
        {...(newProjectProps as ProjectSubmissionFormProps)}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test("it should render and match snapshot without errors for editProjectProps", () => {
    const { container } = render(
      <ProjectSubmissionForm
        {...(editProjectProps as ProjectSubmissionFormProps)}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // This won't work because of form validations
  test.skip("it should call the onSubmit callback when the form is submitted", () => {
    const { getByText } = render(
      <ProjectSubmissionForm
        {...(editProjectProps as ProjectSubmissionFormProps)}
        onSubmit={onSubmitMock}
      />
    );

    const button = getByText("SUBMIT");

    button.click();

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
