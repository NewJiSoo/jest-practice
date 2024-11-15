import { escape, unescape } from './htmlEscape';

describe("HTML 엔터티 변환 메서드", () => {
  const common = "fred, barney, pebbles";
  describe("escape", () => {
    const hasEscape = 'fred, barney, & pebbles';

    it("단일 특수 문자를 올바르게 변환한다", () => {
      expect(escape("&")).toBe("&amp;");
      expect(escape("<")).toBe("&lt;");
      expect(escape(">")).toBe("&gt;");
      expect(escape('"')).toBe("&quot;");
      expect(escape("'")).toBe("&#39;");
    });

    it("문자열에 포함된 특수 문자를 HTML 엔터티로 변환하여 반환한다", () => {
      expect(escape(hasEscape)).toBe("fred, barney, &amp; pebbles")
    });

    it("변환할 특수 문자가 없으면 기존 문자열을 반환한다", () => {
      expect(escape(common)).toBe("fred, barney, pebbles")
    });

    it("변환할 특수 문자가 두개 이상이면 모두 변환된다", () => {
      expect(escape("fred, barney, >, ' pebbles")).toBe("fred, barney, &gt;, &#39; pebbles")
      expect(escape("fred, barney, >, \", ' pebbles")).toBe("fred, barney, &gt;, &quot;, &#39; pebbles")
      expect(escape("fred, barney, <, >, \", ' pebbles")).toBe("fred, barney, &lt;, &gt;, &quot;, &#39; pebbles")
      expect(escape("fred, barney, & <, >, \", ' pebbles")).toBe("fred, barney, &amp; &lt;, &gt;, &quot;, &#39; pebbles")
    });

    it("htmlEscapes에 포함되지 않은 특수 문자는 변환되지 않는다", () => {
      expect(escape("fred, [, ] pebbles")).toBe("fred, [, ] pebbles")
      expect(escape("fred, -, = *, () pebbles")).toBe("fred, -, = *, () pebbles")
    });

  });

  describe("unescape", () => {
    const hasUnEscape = "fred, barney, &amp; pebbles";

    it("단일 HTML 엔터티를 올바르게 변환한다", () => {
      expect(unescape("&amp;")).toBe("&");
      expect(unescape("&lt;")).toBe("<");
      expect(unescape("&gt;")).toBe(">");
      expect(unescape("&quot;")).toBe('"');
      expect(unescape("&#39;")).toBe("'");
    });

    it("문자열에 포함된 HTML 엔터티를 특수 문자로 변환하여 반환한다", () => {
      expect(unescape(hasUnEscape)).toBe("fred, barney, & pebbles")
    });

    it("변환할 문자열이 없으면 기존 문자열을 반환한다.", () => {
      expect(unescape(common)).toBe("fred, barney, pebbles")
    });

    it("변환할 HTML 엔터티가 두개 이상이면 모두 변환된다", () => {
      expect(unescape("fred, barney, &gt;, &#39; pebbles")).toBe("fred, barney, >, ' pebbles")
      expect(unescape("fred, barney, &gt;, &quot;, &#39; pebbles")).toBe("fred, barney, >, \", ' pebbles")
      expect(unescape("fred, barney, &lt;, &gt;, &quot;, &#39; pebbles")).toBe("fred, barney, <, >, \", ' pebbles")
      expect(unescape("fred, barney, &amp; &lt;, &gt;, &quot;, &#39; pebbles")).toBe("fred, barney, & <, >, \", ' pebbles")
    });

    it("htmlUnescapes 포함되지 않은 특수 문자는 변환되지 않는다", () => {
      expect(escape("fred, [, ] pebbles")).toBe("fred, [, ] pebbles")
      expect(escape("fred, -, = *, () pebbles")).toBe("fred, -, = *, () pebbles")
    });
  });

  it("빈 문자열인 경우 빈 문자열을 반환한다", () => {
    expect(escape("")).toBe("")
    expect(unescape("")).toBe("")
  })
});

