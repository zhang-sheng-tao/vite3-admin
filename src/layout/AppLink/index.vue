<template>
  <component v-if="type" :is="type" v-bind="linkProps">
    <slot />
  </component>
  <slot v-else />
</template>

<script setup>
const props = defineProps(["to"]);
const linkProps = {};
let type = "";

if (props.to.includes("http") && props.to.includes("://")) {
  type = "a";
  linkProps.href = props.to;
  linkProps.target = "_blank";
} else {
  type = "router-link";
  linkProps.to = props.to;
}
</script>

<style>
.app-link__sharp {
  font-size: 0.85em;
  color: var(--primary-color);
}

.app-link__sharp:hover {
  border-bottom: 2px solid var(--primary-color);
}

.app-link--disabled {
  pointer-events: none;
}
</style>
