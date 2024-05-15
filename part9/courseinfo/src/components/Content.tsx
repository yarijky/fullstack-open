import { CoursePart } from "../types"

type ContentProps = { courseParts: CoursePart[] }

const Content = ({ courseParts }: ContentProps) => {
  return courseParts.map((part) => {
    switch (part.kind) {
      case "basic":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i>{part.description}</i>
          </p>
        )
      case "group":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            {`project exercises ${part.groupProjectCount}`}
          </p>
        )

      case "background":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}{" "}
            </b>
            <br />
            <i>{part.description}</i>
            <br />
            {`submit to: ${part.backgroundMaterial}`}
          </p>
        )

      case "special":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}{" "}
            </b>
            <br />
            <i>{part.description}</i>
            <br />
            {`required skills:${part.requirements.map((req) => ` ${req}`)}`}
          </p>
        )
    }
  })
}

export default Content
