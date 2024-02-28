import { Link } from "react-router-dom";

export default function TButton({
  color = "indigo",
  to = "",
  circle = false,
  href = "",
  link = false,
  target = "_blank",
  onClick = () => {},
  children,
}) {
  let classes = [
    "inline-flex",
    "items-center",
    "text-sm",
    `border-${color}-500`, // Set border color based on the color prop
    "rounded-md", // Apply rounded corners
    "px-2", // Apply horizontal padding
    "py-1", // Apply vertical padding
  ];

  if (link) {
    classes = [...classes, "transition-colors"];

    switch (color) {
      case "indigo":
        classes = [...classes, "text-indigo-500", "focus:border-indigo-500"];
        break;
      case "red":
        classes = [...classes, "text-red-500", "focus:border-red-500"];
        break;
      case "blue":
        classes = [...classes, "text-blue-500", "focus:border-blue-500"];
    }
  } else {
    classes = [...classes, "text-white", "focus:ring-2", "focus:ring-offset-2"];

    switch (color) {
      case "indigo":
        classes = [
          ...classes,
          "bg-indigo-600",
          "hover:bg-indigo-700",
          "focus:ring-indigo-500",
        ];
        break;
      case "red":
        classes = [
          ...classes,
          "bg-red-600",
          "hover:bg-red-700",
          "focus:ring-red-500",
        ];
        break;
      case "green":
        classes = [
          ...classes,
          "bg-emerald-500",
          "hover:bg-emerald-600",
          "focus:ring-emerald-400",
        ];
        break;
      case "blue":
        classes = [
          ...classes,
          "bg-blue-500",
          "hover:bg-blue-600",
          "focus:ring-blue-400",
        ];
    }
  }

  if (circle) {
    classes = [
      ...classes,
      "h-8",
      "w-8",
      "items-center",
      "justify-center",
      "rounded-full",
    ];
  } else {
    classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
  }

  return (
    <>
      {href && (
        <a href={href} className={classes.join(" ")} target={target}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={classes.join(" ")}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button onClick={onClick} className={classes.join(" ")}>
          {children}
        </button>
      )}
    </>
  );
}
