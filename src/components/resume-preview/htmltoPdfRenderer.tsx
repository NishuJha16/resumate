import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";
import type { Node, Element, DataNode } from "domhandler";

const styles = StyleSheet.create({
  view: {
    marginTop: 4,
    width: "100%",
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 6,
    flexWrap: "wrap",
    width: "100%",
  },
  bold: {
    fontSize: 9,
    fontWeight: "bold",
    paddingLeft: 2,
    paddingRight: 2,
  },
  bulletList: {
    marginBottom: 4,
  },
  bulletItem: {
    flexDirection: "row",
    fontSize: 9,
    marginBottom: 4,
    textAlign: "left",
    width: "100%",
  },
  bulletSymbol: {
    marginRight: 4,
  },
});

function isBoldStyle(style?: string): boolean {
  if (!style) return false;

  const regex = /font-weight\s*:\s*(bold|bolder|[5-9]00)/i;
  return regex.test(style);
}

function renderNode(node: Node, key = 0): React.ReactNode {
  if ((node as DataNode).type === "text") {
    const text = (node as DataNode).data;
    return text ? <Text key={key}>{text}</Text> : null;
  }

  if ((node as Element).type === "tag") {
    const element = node as Element;
    const tag = element.name.toLowerCase();
    const styleAttr = element.attribs?.style || "";
    const boldFromStyle = isBoldStyle(styleAttr);

    const children = (element.children || [])
      .map((child, i) => renderNode(child, i))
      .filter(Boolean);

    switch (tag) {
      case "p":
        return (
          <Text key={key} style={styles.paragraph}>
            {children}
          </Text>
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
          <View key={key} style={styles.bulletList}>
            {children}
          </View>
        );

      case "li":
        return (
          <View key={key} style={styles.bulletItem}>
            <Text style={styles.bulletSymbol}>•</Text>
            <Text>{children}</Text>
          </View>
        );

      case "br":
        return <Text key={key}>{"\n"}</Text>;

      default:
        return (
          <Text key={key} style={boldFromStyle ? styles.bold : { fontSize: 9 }}>
            {children}
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
      {dom.children.map((node, i) => (
        <React.Fragment key={i}>{renderNode(node, i)}</React.Fragment>
      ))}
    </View>
  );
};
