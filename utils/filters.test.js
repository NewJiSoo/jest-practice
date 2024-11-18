// https://github.com/codeit-bootcamp-frontend/FE-ADV-Practice/blob/298ddc1e86b539da32069f580e09d6e2f06f4046/frameworkless/view/filters.test.js
import filterComponent from "./filters";

describe("filters", () => {
  let targetElement;
  let changeFilterMock;

  beforeEach(() => {
    // 대상 필터 요소
    // a.textContent(All, Active, Completed) === currentFilter(클릭된 a태그)
    targetElement = document.createElement("ul");
    targetElement.innerHTML = `
      <ul class="filters" data-component="filters">
        <li>
            <a href="#/">All</a>
        </li>
        <li>
            <a href="#/active">Active</a>
        </li>
        <li>
            <a href="#/completed">Completed</a>
        </li>
    </ul>
    `;
    changeFilterMock = jest.fn();
  });

  test("currentFilter에 따라 'selected'클래스가 설정된다", () => {
    const currentFilter = "Active";
    const newFilters = filterComponent(
      targetElement,
      { currentFilter },
      { changeFilter: changeFilterMock }
    );

    const links = newFilters.querySelectorAll("li a");
    expect(links[0].classList.contains("selected")).toBe(true); // "All" 필터가 선택됨
    expect(links[1].classList.contains("selected")).toBe(false);
    expect(links[2].classList.contains("selected")).toBe(false);
  });
});
