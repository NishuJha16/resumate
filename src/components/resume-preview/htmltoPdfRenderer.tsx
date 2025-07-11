import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";
import { Element, Text as DomText, Node } from "domhandler";

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 9,
    marginBottom: 6,
    lineHeight: 1.4,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  bold: {
    fontWeight: "bold",
  },
  bullet: {
    flexDirection: "row",
    fontSize: 9,
    marginBottom: 4,
    textAlign: "left",
  },
  view: {
    marginTop: 4,
  },
});

function renderNode(node: Node, key: number = 0): React.ReactNode {
  if (node.type === "text") {
    const text = (node as DomText).data;
    return text ? <Text key={key}>{text}</Text> : null;
  }

  if (node.type === "tag") {
    const element = node as Element;
    const children = (element.children || []).map((child, i) =>
      renderNode(child, i)
    );

    switch (element.name) {
      case "p":
        return (
          <View
            key={key}
            style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}
          >
            <Text style={styles.paragraph}>{children}</Text>
          </View>
        );
      case "strong":
      case "b":
        return (
          <Text key={key} style={styles.bold}>
            {children}
          </Text>
        );
      case "ul":
        return (
          <View key={key} style={{ marginBottom: 6 }}>
            {children}
          </View>
        );
      case "li":
        return (
          <View key={key} style={styles.bullet}>
            <Text style={{ marginRight: 4 }}>•</Text>
            <Text>{children}</Text>
          </View>
        );
      case "br":
        return <Text key={key}>{"\n"}</Text>;
      default:
        // Insert a space between inline elements
        return (
          <Text key={key}>
            {children.map((child, i) => (
              <Text key={i}>{child}</Text>
            ))}{" "}
          </Text>
        );
    }
  }

  return null;
}

export const HtmlToPdfRenderer = ({ html }: { html: string }) => {
  const dom = parseDocument(html);
  return (
    <View style={styles.view}>
      {dom.children.map((node: any, i: number) => (
        <View key={i}>{renderNode(node, i)}</View>
      ))}
    </View>
  );
};
