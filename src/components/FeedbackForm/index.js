import React, { useMemo } from "react"

import { useFeedbackForm } from "../../hooks/useFeedbackForm"
import { useFeedbackFormData } from "../../hooks/useFeedbackFormData"
import { useToast } from "../../hooks/useToast"
import { InputField } from "../InputField"
import { LoadingSpinner } from "../LoadingSpinner"
import "./styles.scss"

export const FeedbackForm = () => {
  const { header, setHeader, headers } = useFeedbackFormData()

  const sections = headers.map(({ value }) => ({
    label: value,
    value,
  }))

  const { submitHandler, loading, success, error, data, fieldChangeHandler } =
    useFeedbackForm(
      { email: "", feedback: "" },
      header &&
        header.isPageHeader &&
        header.value.replace(/\s+/g, "-").toLowerCase()
    )

  useToast(
    error && error.detail,
    success ? "Thanks for helping us to get better!" : "",
    "feedback-form"
  )

  return (
    <div className="docFeedback__form" id="feedback-form">
      <h3>Did you find this page helpful?</h3>
      <form onSubmit={submitHandler}>
        <InputField
          name="email"
          className="input"
          type="email"
          placeholder="Email Address"
          required
          onChange={fieldChangeHandler}
          value={data.email}
          error={error && error.email}
        />

        <select
          className="input"
          name="sections"
          value={header && header.value}
          onChange={a => setHeader(a.target.value)}
        >
          <option value="Select section" disabled>
            Section:
          </option>
          {sections.map(sectionItem => (
            <option key={sectionItem.value} value={sectionItem.value}>
              {sectionItem.label}
            </option>
          ))}
        </select>
        <textarea
          name="feedback"
          className="input"
          placeholder="Let us know what we can do"
          onChange={fieldChangeHandler}
          value={data.feedback}
          rows="4"
          required
        />
        <button className="button button--primary" type="submit">
          {loading ? <LoadingSpinner size={18} /> : "SUBMIT"}
        </button>
      </form>
    </div>
  )
}
