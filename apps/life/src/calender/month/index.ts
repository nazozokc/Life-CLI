import calendarize from "calendarize";
import consola from "consola";

export const render = async (month?: number): Promise<void> => {
  const today = new Date();
  const month = month - 1;
  const render = calendarize(today.getFullYear(), month ?? today.getMonth());

  consola.log(render);
};
